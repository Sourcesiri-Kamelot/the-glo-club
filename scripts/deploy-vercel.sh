#!/bin/bash

# Glo Club - Vercel Deployment Script
echo "🚀 Deploying Glo Club to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready!"

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Set up production database (PlanetScale, Supabase, or Neon)"
echo "2. Configure environment variables in Vercel dashboard"
echo "3. Set up custom domain if needed"
echo "4. Configure Ollama or Azure OpenAI for production"
echo "5. Test all functionality on live site"
echo ""
echo "🔗 Your Glo Club is now live!"
