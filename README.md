# DCACNet-CD
**Deep Condensing Attention Classifier Network for Skin Lesion Classification**

A lightweight deep learning model for efficient and accurate skin lesion classification, deployed as a privacy-first web application.

## Overview

DCACNet-CD is an end-to-end machine learning project that demonstrates the complete pipeline from model development to production deployment. The system classifies skin lesion images into 7 diagnostic categories using a custom-designed convolutional neural network optimized for both accuracy and efficiency.

**Live Demo:** [dcac-net-cd.vercel.app](https://dcac-net-cd.vercel.app)

## What Makes This Project Unique

### 1. Custom Architecture Design
Unlike transfer learning approaches, DCACNet features a novel architecture built from scratch:

- **Condensing Layers**: Progressive spatial reduction with channel expansion for efficient feature extraction
- **Attention Condenser Blocks (ACB)**: Custom attention mechanism that learns to focus on diagnostically relevant regions
- **Lightweight Design**: Only 458,314 parameters (1.75 MB model size) while achieving 90.80% test accuracy

### 2. Production-Ready Web Platform
Full-stack implementation optimized for real-world deployment:

- **Next.js 16** with App Router and TypeScript
- **ONNX Format**: Cross-platform model deployment
- **Vercel Hosting**: Serverless architecture with global CDN
- **Responsive UI**: Professional interface with Tailwind CSS

## How It Works

### Model Training
1. **Dataset**: HAM10000 - 10,015 dermatoscopic images across 7 lesion types
2. **Augmentation**: Expanded to 46,935 images using rotation, shifting, scaling, and flipping
3. **Architecture**: 3-layer DCACNet with attention mechanisms
4. **Training**: PyTorch 2.7.0, Adam optimizer, 25 epochs with early stopping
5. **Performance**: 90.80% test accuracy, 90.85% validation accuracy

### Model Architecture
```
Input (224×224×3)
    ↓
CondensingLayer(3→32) → ACB(32→64)
    ↓
CondensingLayer(64→128) → ACB(128→128)
    ↓
CondensingLayer(128→256) → ACB(256→256)
    ↓
GlobalAveragePooling
    ↓
FullyConnected(256→7)
```
### Classification Categories
- **akiec**: Actinic Keratoses and Intraepithelial Carcinoma (90.60% accuracy)
- **bcc**: Basal Cell Carcinoma (97.99% accuracy)
- **bkl**: Benign Keratosis (75.62% accuracy)
- **df**: Dermatofibroma (98.96% accuracy)
- **mel**: Melanoma (77.78% accuracy)
- **nv**: Melanocytic Nevi (94.93% accuracy)
- **vasc**: Vascular Lesions (99.70% accuracy)

## Technology Stack

**Model Development:**
- PyTorch 2.7.0 for training
- Custom CNN architecture with attention mechanisms
- ONNX export for cross-platform compatibility

**Web Platform:**
- Next.js 16 (React 19, TypeScript)
- ONNX Runtime Web (WebAssembly)
- Tailwind CSS for styling
- Vercel for deployment

**Key Features:**
- Real-time browser-based inference
- No server-side processing (zero latency)
- Fully responsive design
- Performance dashboard with metrics visualization
- Educational content about model architecture

## Model Performance

| Metric | Value |
|--------|-------|
| Test Accuracy | 90.80% |
| Validation Accuracy | 90.85% |
| Model Parameters | 458,314 |
| Model Size | 1.75 MB |
| Training Framework | PyTorch 2.7.0 |
| Inference Time | < 500ms |

## Project Structure

```
DCACNet-CD/
├── model/                          # PyTorch model and training code
│   ├── dcacnet_model.py           # Model architecture definition
│   ├── train.py                   # Training script
│   ├── evaluate.py                # Evaluation and metrics
│   └── dcacnet_best_model.pth     # Trained model weights
├── dcacnet-cd-panel/              # Next.js web application
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── predict/page.tsx       # Prediction interface
│   │   ├── performance/page.tsx   # Performance metrics
│   │   └── about/page.tsx         # Technical documentation
│   └── public/
│       ├── model/                 # ONNX model and metadata
│       └── charts/                # Performance visualizations
└── convert_to_onnx.py             # PyTorch to ONNX conversion
```

## Why This Approach?

### Efficiency
- Small model size enables browser deployment
- Single inference < 500ms on consumer hardware
- No expensive GPU servers required

### Privacy
- Medical images remain on user's device
- No data transmission or storage
- Compliant with healthcare privacy standards

### Accessibility
- Works on any modern browser
- No authentication or API keys needed
- Instant predictions without infrastructure costs

### Scalability
- Static deployment on CDN
- Unlimited concurrent users (client-side compute)
- Zero server maintenance

## Educational Value

This project demonstrates:
1. **Custom architecture design** rather than fine-tuning pre-trained models
2. **Model optimization** for deployment constraints (size, speed)
3. **Production ML engineering** - complete pipeline from research to deployment
4. **Modern web ML** - leveraging WebAssembly for browser-based inference
5. **Full-stack development** - integrating ML models into user-facing applications

## Disclaimer

This tool is developed for **educational and research purposes only**. It is NOT intended for medical diagnosis or clinical use. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.

## License

This project is available for educational and research purposes.

## Author

Developed as a portfolio project demonstrating end-to-end machine learning engineering - from custom architecture design to production web deployment.
