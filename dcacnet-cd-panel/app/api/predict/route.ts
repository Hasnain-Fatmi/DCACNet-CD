import { NextRequest, NextResponse } from 'next/server';
import * as ort from 'onnxruntime-web';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Configure ONNX Runtime for Node.js environment
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = false;

// Load model metadata
const metadataPath = path.join(process.cwd(), 'public', 'model', 'model_metadata.json');
let metadata: any = null;

async function getMetadata() {
  if (!metadata) {
    const data = await fs.readFile(metadataPath, 'utf-8');
    metadata = JSON.parse(data);
  }
  return metadata;
}

// Load ONNX model
let session: ort.InferenceSession | null = null;

async function getSession() {
  if (!session) {
    const modelPath = path.join(process.cwd(), 'public', 'model', 'dcacnet_model.onnx');
    session = await ort.InferenceSession.create(modelPath);
  }
  return session;
}

// Preprocess image
async function preprocessImage(imageBuffer: Buffer): Promise<Float32Array> {
  const meta = await getMetadata();
  const size = meta.image_size;
  const mean = meta.preprocessing.normalize.mean;
  const std = meta.preprocessing.normalize.std;

  // Resize and convert to RGB
  const { data, info } = await sharp(imageBuffer)
    .resize(size, size)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Normalize and convert to CHW format (channels, height, width)
  const float32Data = new Float32Array(3 * size * size);
  const pixelCount = size * size;

  for (let i = 0; i < pixelCount; i++) {
    const r = data[i * 3] / 255.0;
    const g = data[i * 3 + 1] / 255.0;
    const b = data[i * 3 + 2] / 255.0;

    // Normalize and arrange in CHW format
    float32Data[i] = (r - mean[0]) / std[0];                    // R channel
    float32Data[pixelCount + i] = (g - mean[1]) / std[1];       // G channel
    float32Data[2 * pixelCount + i] = (b - mean[2]) / std[2];   // B channel
  }

  return float32Data;
}

// Softmax function
function softmax(logits: number[]): number[] {
  const maxLogit = Math.max(...logits);
  const expScores = logits.map(x => Math.exp(x - maxLogit));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  return expScores.map(x => x / sumExp);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Preprocess image
    const inputTensor = await preprocessImage(buffer);
    const meta = await getMetadata();

    // Create ONNX tensor
    const tensor = new ort.Tensor('float32', inputTensor, [1, 3, meta.image_size, meta.image_size]);

    // Run inference
    const session = await getSession();
    const feeds = { input: tensor };
    const results = await session.run(feeds);
    const output = results.output.data as Float32Array;

    // Apply softmax to get probabilities
    const probabilities = softmax(Array.from(output));

    // Get predictions
    const predictions = probabilities.map((prob, idx) => ({
      class: meta.class_names[idx],
      className: meta.class_descriptions[meta.class_names[idx]],
      probability: prob,
      confidence: (prob * 100).toFixed(2)
    }));

    // Sort by probability
    predictions.sort((a, b) => b.probability - a.probability);

    // Get top prediction
    const topPrediction = predictions[0];

    return NextResponse.json({
      success: true,
      prediction: topPrediction.class,
      className: topPrediction.className,
      confidence: parseFloat(topPrediction.confidence),
      allPredictions: predictions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process image', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
