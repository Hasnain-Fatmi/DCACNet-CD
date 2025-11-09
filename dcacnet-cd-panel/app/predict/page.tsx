'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

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

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
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
            }`}
          >
            <input {...getInputProps()} />
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
                disabled={isLoading}
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
                    Prediction completed successfully
                  </p>
                </div>
              </div>

              {/* All Predictions */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-semibold mb-4">All Predictions</h3>
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
