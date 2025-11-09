import { Code, Database, Cpu, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">About DCACNet</h1>
        <p className="text-gray-600 text-lg">
          Technical details about the model architecture and development
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Project Overview</h2>
        <p className="text-gray-700 mb-4">
          DCACNet (Deep Condensing Attention Classifier Network) is a lightweight
          deep learning model designed for efficient skin lesion classification.
          The model achieves 90.80% accuracy while maintaining a compact size of
          just 1.75MB, making it ideal for web deployment and real-time inference.
        </p>
        <p className="text-gray-700">
          This project was developed as a research initiative to create an
          accessible, fast, and accurate tool for skin lesion classification,
          leveraging the HAM10000 dataset which contains dermatoscopic images of
          common pigmented skin lesions.
        </p>
      </div>

      {/* Model Architecture */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center mb-6">
          <Layers className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Model Architecture</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Condensing Layers</h3>
            <p className="text-gray-700">
              Custom convolutional layers that progressively reduce spatial
              dimensions while increasing feature channels. Uses 3x3 convolutions
              with stride 2 for efficient downsampling.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Attention Condenser Blocks (ACB)
            </h3>
            <p className="text-gray-700">
              Novel attention mechanism that enhances feature extraction by
              applying spatial attention gates. Each ACB learns to focus on the
              most relevant regions of the feature maps.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Network Structure</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Input: 224x224 RGB images</li>
              <li>Layer 1: Conv(3→32) + ACB(32→64)</li>
              <li>Layer 2: Conv(64→128) + ACB(128→128)</li>
              <li>Layer 3: Conv(128→256) + ACB(256→256)</li>
              <li>Global Average Pooling</li>
              <li>Fully Connected: 256 → 7 classes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dataset */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Dataset</h2>
        </div>

        <p className="text-gray-700 mb-4">
          <strong>HAM10000 Dataset</strong> - A large collection of
          multi-source dermatoscopic images of common pigmented skin lesions.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-semibold text-gray-900">Original Images</div>
            <div className="text-2xl font-bold text-purple-600">10,015</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-semibold text-gray-900">After Augmentation</div>
            <div className="text-2xl font-bold text-purple-600">46,935</div>
          </div>
        </div>

        <p className="text-gray-700">
          Data augmentation techniques were applied to balance the dataset,
          including rotation, shifting, scaling, and flipping. This ensures the
          model learns robust features across all lesion types.
        </p>
      </div>

      {/* Training Details */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center mb-6">
          <Cpu className="h-6 w-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Training Details</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Framework</h4>
            <p className="text-gray-700">PyTorch 2.7.0</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Optimizer</h4>
            <p className="text-gray-700">Adam (lr=0.001)</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Loss Function</h4>
            <p className="text-gray-700">CrossEntropyLoss</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Epochs</h4>
            <p className="text-gray-700">25 (with early stopping)</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Batch Size</h4>
            <p className="text-gray-700">32</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Best Val Accuracy</h4>
            <p className="text-gray-700">90.85%</p>
          </div>
        </div>
      </div>

      {/* Deployment */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center mb-6">
          <Code className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Deployment</h2>
        </div>

        <p className="text-gray-700 mb-4">
          The model was converted from PyTorch to ONNX format for optimized web
          deployment. This platform is built with:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Frontend:</strong> Next.js 16 with React</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>Inference:</strong> ONNX Runtime</li>
          <li><strong>Hosting:</strong> Vercel (serverless)</li>
          <li><strong>Image Processing:</strong> Sharp</li>
        </ul>
      </div>

      {/* Performance */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Performance Metrics</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">90.80%</div>
            <div className="text-gray-700">Test Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">458K</div>
            <div className="text-gray-700">Parameters</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">1.75MB</div>
            <div className="text-gray-700">Model Size</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-yellow-900 mb-2">Medical Disclaimer</h3>
        <p className="text-yellow-800 text-sm">
          This tool is developed for educational and research purposes only. It
          should NOT be used as a diagnostic tool or substitute for professional
          medical advice. Always consult with qualified healthcare professionals
          for any health concerns or medical conditions.
        </p>
      </div>
    </div>
  );
}
