import Image from 'next/image';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

export default function PerformancePage() {
  const metrics = [
    {
      label: 'Test Accuracy',
      value: '90.80%',
      icon: Target,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Parameters',
      value: '458,314',
      icon: Zap,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Model Size',
      value: '1.75 MB',
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      label: 'Framework',
      value: 'PyTorch',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const classAccuracy = [
    { class: 'Melanoma (mel)', accuracy: '77.78%' },
    { class: 'Melanocytic Nevi (nv)', accuracy: '94.93%' },
    { class: 'Basal Cell Carcinoma (bcc)', accuracy: '97.99%' },
    { class: 'Actinic Keratoses (akiec)', accuracy: '90.60%' },
    { class: 'Benign Keratosis (bkl)', accuracy: '75.62%' },
    { class: 'Dermatofibroma (df)', accuracy: '98.96%' },
    { class: 'Vascular Lesions (vasc)', accuracy: '99.70%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Model Performance</h1>
        <p className="text-gray-600 text-lg">
          Detailed metrics and visualizations of DCACNet's performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${metric.color}`}
            >
              <metric.icon className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-gray-600 text-sm">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Class-wise Accuracy */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Class-wise Accuracy</h2>
        <div className="space-y-4">
          {classAccuracy.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{item.class}</span>
                <span className="text-blue-600 font-semibold">
                  {item.accuracy}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                  style={{ width: item.accuracy }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Confusion Matrix</h2>
        <div className="relative w-full aspect-square md:aspect-video">
          <Image
            src="/charts/confusion_matrix_heatmap.png"
            alt="Confusion Matrix"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Training Curves */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Training & Validation Curves</h2>
        <div className="relative w-full aspect-video">
          <Image
            src="/charts/training_curves.png"
            alt="Training Curves"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ROC Curves */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">ROC Curves</h2>
        <div className="relative w-full aspect-video">
          <Image
            src="/charts/roc_curves.png"
            alt="ROC Curves"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Additional Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Class Accuracy Chart</h3>
          <div className="relative w-full aspect-video">
            <Image
              src="/charts/class_accuracy.png"
              alt="Class Accuracy"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Feature Maps</h3>
          <div className="relative w-full aspect-video">
            <Image
              src="/charts/feature_maps.png"
              alt="Feature Maps"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
