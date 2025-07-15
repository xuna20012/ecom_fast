#!/bin/bash

# Deploy script for Coolify
echo "🚀 Déploiement sur Coolify..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Git operations
echo "📝 Preparing git commit..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to repository
echo "🔄 Pushing to repository..."
git push origin main

echo "🎉 Deployment prepared! Check your Coolify dashboard."
echo ""
echo "📋 Next steps:"
echo "1. Configure environment variables in Coolify dashboard"
echo "2. Set up domain configuration"
echo "3. Deploy from Coolify interface" 