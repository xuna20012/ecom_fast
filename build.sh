#!/bin/sh

# Exit on error
set -e

echo "🔧 Setting up environment variables..."
echo "VITE_SUPABASE_URL=${VITE_SUPABASE_URL}"
echo "VITE_SUPABASE_ANON_KEY is set: $([ -n "$VITE_SUPABASE_ANON_KEY" ] && echo "✓" || echo "✗")"

# Export variables for the build
export VITE_SUPABASE_URL="${VITE_SUPABASE_URL}"
export VITE_SUPABASE_ANON_KEY="${VITE_SUPABASE_ANON_KEY}"

echo "📦 Installing dependencies..."
npm ci

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed!" 