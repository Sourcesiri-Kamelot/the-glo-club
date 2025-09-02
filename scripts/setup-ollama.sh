#!/bin/bash

# Glo Club AI Assistant - Ollama Setup Script
echo "🤖 Setting up Glo Club AI Assistant with Ollama..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found. Please install Ollama first:"
    echo "   Visit: https://ollama.ai"
    echo "   Or run: curl -fsSL https://ollama.ai/install.sh | sh"
    exit 1
fi

echo "✅ Ollama found!"

# Pull the base model
echo "📥 Pulling Llama 3.2 model..."
ollama pull llama3.2

# Create the custom Glo Club model
echo "🏗️  Creating Glo Club AI Assistant model..."
cd "$(dirname "$0")/.."
ollama create glo-assistant -f ollama/Modelfile

# Train the model with club-specific information
echo "🎓 Training model with Glo Club specific information..."
echo "Training the AI assistant with club knowledge..." | ollama run glo-assistant

# Test the model with club-specific questions
echo "🧪 Testing the model with club-specific questions..."
echo "What are the membership tiers?" | ollama run glo-assistant
echo "How do I book studio time?" | ollama run glo-assistant

echo "🎉 Glo Club AI Assistant is ready and trained!"
echo ""
echo "To use the assistant:"
echo "  ollama run glo-assistant"
echo ""
echo "To integrate with the web app:"
echo "  The model is available at: http://localhost:11434"
echo "  Model name: glo-assistant"
echo ""
echo "Training data available at:"
echo "  ollama/training-data.md"
echo ""
echo "Next steps:"
echo "  1. Start the Next.js development server"
echo "  2. The chatbot will connect to the local Ollama instance"
echo "  3. Test the assistant in the web interface"
echo "  4. The AI now knows all Glo Club specific information!"
