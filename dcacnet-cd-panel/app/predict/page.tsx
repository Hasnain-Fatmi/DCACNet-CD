'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import * as ort from 'onnxruntime-web';

interface Prediction {
  class: string;
  className: string;
  probability: number;
  confidence: string;
}

interface PredictionResult {
  success: boolean;
  prediction: string;
  className: string;
  confidence: number;
  allPredictions: Prediction[];
  timestamp: string;
}

interface ModelMetadata {
  image_size: number;
  class_names: string[];
  class_descriptions: Record<string, string>;
  preprocessing: {
    normalize: {
      mean: number[];
      std: number[];
    };
  };
}

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<ort.InferenceSession | null>(null);
  const metadataRef = useRef<ModelMetadata | null>(null);

  // Load model and metadata on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);

        // Load metadata
        const metaResponse = await fetch('/model/model_metadata.json');
        metadataRef.current = await metaResponse.json();

        // Load ONNX model
        sessionRef.current = await ort.InferenceSession.create('/model/dcacnet_model.onnx', {
          executionProviders: ['wasm'],
        });

        setIsModelLoading(false);
      } catch (err) {
        console.error('Model loading error:', err);
        setError('Failed to load model. Please refresh the page.');
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  // Preprocess image to tensor
  const preprocessImage = async (file: File): Promise<Float32Array> => {
    const metadata = metadataRef.current!;
    const size = metadata.image_size;
    const mean = metadata.preprocessing.normalize.mean;
    const std = metadata.preprocessing.normalize.std;

    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        // Draw and resize image
        ctx.drawImage(img, 0, 0, size, size);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, size, size);
        const { data } = imageData;

        // Convert to Float32Array in CHW format
        const float32Data = new Float32Array(3 * size * size);
        const pixelCount = size * size;

        for (let i = 0; i < pixelCount; i++) {
          const r = data[i * 4] / 255.0;
          const g = data[i * 4 + 1] / 255.0;
          const b = data[i * 4 + 2] / 255.0;

          // Normalize and arrange in CHW format
          float32Data[i] = (r - mean[0]) / std[0];
          float32Data[pixelCount + i] = (g - mean[1]) / std[1];
          float32Data[2 * pixelCount + i] = (b - mean[2]) / std[2];
        }

        resolve(float32Data);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Softmax function
  const softmax = (logits: Float32Array): number[] => {
    const arr = Array.from(logits);
    const maxLogit = Math.max(...arr);
    const expScores = arr.map(x => Math.exp(x - maxLogit));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    return expScores.map(x => x / sumExp);
  };

  const handlePredict = async () => {
    if (!selectedFile || !sessionRef.current || !metadataRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Preprocess image
      const inputData = await preprocessImage(selectedFile);
      const metadata = metadataRef.current;

      // Create tensor
      const tensor = new ort.Tensor('float32', inputData, [1, 3, metadata.image_size, metadata.image_size]);

      // Run inference
      const feeds = { '': tensor };
      const results = await sessionRef.current.run(feeds);
      const outputName = Object.keys(results)[0];
      const output = results[outputName].data as Float32Array;

      // Apply softmax
      const probabilities = softmax(output);

      // Get predictions
      const predictions: Prediction[] = probabilities.map((prob, idx) => ({
        class: metadata.class_names[idx],
        className: metadata.class_descriptions[metadata.class_names[idx]],
        probability: prob,
        confidence: (prob * 100).toFixed(2)
      }));

      // Sort by probability
      predictions.sort((a, b) => b.probability - a.probability);

      // Get top prediction
      const topPrediction = predictions[0];

      setResult({
        success: true,
        prediction: topPrediction.class,
        className: topPrediction.className,
        confidence: parseFloat(topPrediction.confidence),
        allPredictions: predictions,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Try the Model</h1>
        <p className="text-gray-600 text-lg">
          Upload a skin lesion image to get an AI-powered classification
        </p>
        {isModelLoading && (
          <div className="mt-4 flex items-center justify-center text-blue-600">
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            <span className="text-sm">Loading model...</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${isModelLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} disabled={isModelLoading} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the image here...</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium mb-2">
                  Drag & drop an image here
                </p>
                <p className="text-gray-500 text-sm">
                  or click to select a file
                </p>
              </>
            )}
          </div>

          {preview && (
            <div className="mt-6">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={handlePredict}
                disabled={isLoading || isModelLoading}
                className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Top Prediction */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Top Prediction
                    </h3>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {result.className}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Class: {result.prediction}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full font-semibold ${getConfidenceColor(
                      result.confidence
                    )}`}
                  >
                    {result.confidence.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm text-gray-700">
                    Analysis completed successfully
                  </p>
                </div>
              </div>

              {/* All Predictions */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-900">All Predictions</h3>
                <div className="space-y-3">
                  {result.allPredictions.map((pred, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {pred.className}
                          </p>
                          <p className="text-xs text-gray-500">{pred.class}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {pred.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This is an educational tool only.
                  Always consult with a healthcare professional for medical
                  advice and diagnosis.
                </p>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <p className="text-gray-500">
                Upload an image to see prediction results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
