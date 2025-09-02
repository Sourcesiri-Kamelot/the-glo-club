#!/bin/bash

# Glo Club - Netlify Deployment Script
echo "🚀 Deploying Glo Club to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI ready!"

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=.next

echo "🎉 Deployment complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Set up production database"
echo "2. Configure environment variables in Netlify dashboard"
echo "3. Set up custom domain if needed"
echo "4. Configure serverless functions for API routes"
echo "5. Test all functionality on live site"
echo ""
echo "🔗 Your Glo Club is now live!"
