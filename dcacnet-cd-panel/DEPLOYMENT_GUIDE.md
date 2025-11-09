# DCACNet Platform - Deployment Guide

Complete guide for deploying your DCACNet platform to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- Git installed locally
- Your platform is ready in `dcacnet-cd-panel` directory

## Option 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `dcacnet-platform`)

2. In your terminal, navigate to the platform directory:
```bash
cd dcacnet-cd-panel
```

3. Initialize git and push:
```bash
git init
git add .
git commit -m "Initial commit - DCACNet platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dcacnet-platform.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project
5. Leave all settings as default
6. Click "Deploy"

That's it! Your platform will be live in ~2 minutes.

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From the `dcacnet-cd-panel` directory:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **dcacnet-platform** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment

### 1. Verify Deployment

After deployment, Vercel will give you a URL like:
- `https://dcacnet-platform.vercel.app`

Test these pages:
- ✅ Home page: `/`
- ✅ Prediction page: `/predict`
- ✅ Performance page: `/performance`
- ✅ About page: `/about`
- ✅ API: `/api/model-info`

### 2. Test Prediction

1. Go to `/predict`
2. Upload a test image
3. Click "Analyze Image"
4. Verify you get predictions with confidence scores

### 3. Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS setup instructions

## Troubleshooting

### Build Fails

If build fails, check:
- All dependencies are in `package.json`
- Model files are in `public/model/`
- Charts are in `public/charts/`

### API Errors

If predictions fail:
- Check Vercel function logs in dashboard
- Verify model file is accessible
- Check function timeout settings (should be 60s)

### Out of Memory

If you get memory errors:
- Model is already optimized at 1.75MB
- Vercel free tier provides 1024MB which should be sufficient
- If needed, upgrade to Pro plan

## Performance Optimization

Your platform is already optimized:
- ✅ ONNX model (1.75MB)
- ✅ Static assets cached
- ✅ Images optimized with Next.js Image
- ✅ API routes with proper caching

## Monitoring

View deployment analytics in Vercel dashboard:
- Real-time errors
- Function execution time
- Bandwidth usage
- Visitor analytics

## Updates

To update your deployment:

### Via GitHub (Auto-deploy)
1. Make changes locally
2. Commit and push to GitHub
3. Vercel auto-deploys on push

### Via CLI
```bash
vercel --prod
```

## Cost

- **Vercel Free Tier**: Perfect for this project
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions included
  - Free SSL certificates

- **Upgrade to Pro** ($20/month) only if you need:
  - Higher bandwidth
  - More function execution time
  - Team collaboration

## Security

Your deployment is secure:
- ✅ HTTPS by default
- ✅ No sensitive data exposed
- ✅ API routes properly configured
- ✅ Medical disclaimer included

## Next Steps

1. ✅ Share your deployment URL
2. ✅ Add to your portfolio
3. ✅ Update GitHub link in navigation
4. ✅ Consider adding Google Analytics
5. ✅ Monitor usage and performance

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Your repo issues page

---

## Quick Reference

```bash
# Local development
npm run dev

# Build locally
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel --prod

# View logs
vercel logs
```

## Environment Setup Checklist

- [x] Model files copied to `public/model/`
- [x] Charts copied to `public/charts/`
- [x] All dependencies installed
- [x] Build succeeds locally
- [x] API endpoints working
- [x] All pages render correctly
- [x] README updated
- [x] vercel.json configured

Your DCACNet platform is production-ready! 🚀
