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
echo "📋 Configuration Coolify recommandée:"
echo "- Build Pack: Nixpacks"
echo "- Is it a static site: ❌ (Non coché)"
echo "- Install Command: npm ci"
echo "- Build Command: npm run build"
echo "- Start Command: npm run preview"
echo "- Port: 3000"
echo ""
echo "📋 Variables d'environnement à ajouter:"
echo "- VITE_SUPABASE_URL=https://your-project.supabase.co"
echo "- VITE_SUPABASE_ANON_KEY=your-anon-key"
echo "- PORT=3000" 