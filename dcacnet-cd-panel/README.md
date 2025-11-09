# DCACNet - Skin Lesion Classification Platform

AI-powered skin lesion classification using a lightweight custom CNN architecture.

## Features

- **90.8% Test Accuracy** - High-performance classification across 7 skin lesion types
- **Lightweight Model** - Only 1.75MB, optimized with ONNX for fast inference
- **Interactive Demo** - Real-time predictions with confidence scores
- **Performance Dashboard** - Comprehensive metrics and visualizations
- **Responsive Design** - Works seamlessly on desktop and mobile

## Lesion Classes

The model can classify 7 different types of skin lesions:

1. **Melanoma (mel)** - Malignant skin cancer
2. **Melanocytic Nevi (nv)** - Benign moles
3. **Basal Cell Carcinoma (bcc)** - Common skin cancer type
4. **Actinic Keratoses (akiec)** - Pre-cancerous lesions
5. **Benign Keratosis (bkl)** - Harmless growth
6. **Dermatofibroma (df)** - Benign skin lesion
7. **Vascular Lesions (vasc)** - Blood vessel related

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: PyTorch → ONNX
- **Inference**: ONNX Runtime (Node.js)
- **Image Processing**: Sharp
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No environment variables required for basic deployment.

## Project Structure

```
dcacnet-cd-panel/
├── app/
│   ├── api/
│   │   ├── predict/           # Prediction API endpoint
│   │   └── model-info/        # Model metadata endpoint
│   ├── predict/               # Prediction interface page
│   ├── performance/           # Performance dashboard
│   ├── about/                 # About page
│   ├── layout.tsx             # Root layout with navigation
│   └── page.tsx               # Home page
├── public/
│   ├── model/                 # ONNX model and metadata
│   ├── charts/                # Performance visualizations
│   └── samples/               # Sample images
├── package.json
├── vercel.json                # Vercel configuration
└── README.md
```

## Model Architecture

DCACNet uses a custom architecture combining:

- **Condensing Layers**: Efficient spatial downsampling
- **Attention Condenser Blocks (ACB)**: Spatial attention mechanisms
- **Global Average Pooling**: Dimensionality reduction
- **Fully Connected Layer**: Final classification

**Parameters**: 458,314
**Model Size**: 1.75 MB
**Input**: 224×224 RGB images

## Training Details

- **Dataset**: HAM10000 (augmented to 46,935 images)
- **Framework**: PyTorch 2.7.0
- **Optimizer**: Adam (lr=0.001)
- **Epochs**: 25 (with early stopping)
- **Best Validation Accuracy**: 90.85%

## Performance Metrics

- **Test Accuracy**: 90.80%
- **Inference Time**: ~50-100ms per image
- **Model Format**: ONNX (Opset 14)

## Medical Disclaimer

This tool is for **educational and research purposes only**. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.

## License

This project is licensed under the MIT License.

## Author

Built with Next.js, PyTorch, and ONNX.

## Acknowledgments

- HAM10000 Dataset
- PyTorch Team
- ONNX Runtime
- Vercel
