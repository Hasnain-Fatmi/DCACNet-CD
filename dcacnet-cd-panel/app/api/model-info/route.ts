import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'model', 'model_metadata.json');
    const data = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(data);

    // Add performance metrics (from your training results)
    const modelInfo = {
      ...metadata,
      performance: {
        testAccuracy: 90.80,
        totalParams: 458314,
        modelSize: '1.75 MB',
        framework: 'PyTorch → ONNX',
        opsetVersion: 14
      }
    };

    return NextResponse.json(modelInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load model info' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
