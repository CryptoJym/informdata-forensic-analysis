# Vercel Deployment Guide

## Repository
https://github.com/CryptoJym/informdata-forensic-analysis

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CryptoJym/informdata-forensic-analysis)

### Option 2: Manual Setup

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Git Repository**
   - Select "Import Git Repository"
   - Choose "CryptoJym/informdata-forensic-analysis"
   - Click "Import"

3. **Configure Project**
   - Framework Preset: `Other`
   - Build Command: `npm run build` (or leave empty)
   - Output Directory: `public`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## Automatic Deployments

Once connected, Vercel will automatically deploy:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

No environment variables are required for this static site.

## Project Structure

```
informdata-forensic-analysis/
├── public/               # Static files (deployed)
│   ├── index.html       # Main dashboard
│   ├── detailed-analysis.html
│   ├── styles.css
│   └── scripts.js
├── src/                 # Remotion source (not deployed)
├── vercel.json         # Vercel configuration
└── package.json
```

## Live URL

Your site will be available at:
- Production: `https://informdata-forensic-analysis.vercel.app`
- Or your custom domain if configured

## Updating Content

1. Make changes to files in the `public/` directory
2. Commit and push to GitHub
3. Vercel will automatically deploy within minutes

## Support

- Vercel Documentation: https://vercel.com/docs
- GitHub Repository: https://github.com/CryptoJym/informdata-forensic-analysis