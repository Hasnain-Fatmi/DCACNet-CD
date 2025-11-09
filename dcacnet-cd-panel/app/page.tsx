import Link from "next/link";
import { Brain, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          AI-Powered Medical Imaging
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skin Lesion Classification
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Deep learning model for classifying skin lesions with 90.8% accuracy.
          Built with a lightweight custom CNN architecture (DCACNet) trained on
          the HAM10000 dataset.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/predict"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Try Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition font-semibold text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl font-bold text-blue-600 mb-2">90.8%</div>
          <div className="text-gray-700 font-medium">Test Accuracy</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
          <div className="text-gray-700 font-medium">Lesion Classes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl font-bold text-indigo-600 mb-2">458K</div>
          <div className="text-gray-700 font-medium">Parameters</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Custom Architecture</h3>
          <p className="text-gray-700">
            DCACNet combines condensing layers with attention mechanisms for
            efficient feature extraction.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Zap className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Lightweight & Fast</h3>
          <p className="text-gray-700">
            Only 1.75MB model size with fast inference, optimized for web
            deployment using ONNX.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Balanced Dataset</h3>
          <p className="text-gray-700">
            Trained on augmented HAM10000 dataset with balanced class
            distribution.
          </p>
        </div>
      </div>

      {/* Lesion Classes */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Detectable Lesion Types
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">Melanoma (mel)</div>
            <div className="text-sm text-gray-700">Malignant skin cancer</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Melanocytic Nevi (nv)
            </div>
            <div className="text-sm text-gray-700">Benign moles</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Basal Cell Carcinoma (bcc)
            </div>
            <div className="text-sm text-gray-700">
              Common skin cancer type
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Actinic Keratoses (akiec)
            </div>
            <div className="text-sm text-gray-700">Pre-cancerous lesions</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Benign Keratosis (bkl)
            </div>
            <div className="text-sm text-gray-700">Harmless growth</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Dermatofibroma (df)
            </div>
            <div className="text-sm text-gray-700">Benign skin lesion</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">
              Vascular Lesions (vasc)
            </div>
            <div className="text-sm text-gray-700">Blood vessel related</div>
          </div>
        </div>
      </div>
    </div>
  );
}
