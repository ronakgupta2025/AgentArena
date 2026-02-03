#!/bin/bash
# Quick Vercel deployment script

echo "🚀 Deploying AgentArena to Vercel..."
echo ""
echo "Make sure you have:"
echo "1. Vercel CLI installed (npm install -g vercel)"
echo "2. Logged in (vercel login)"
echo ""

cd frontend

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
