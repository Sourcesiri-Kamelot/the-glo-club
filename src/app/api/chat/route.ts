import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  stream?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { messages, stream = false }: ChatRequest = await request.json()
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    const modelName = process.env.OLLAMA_MODEL_NAME || 'glo-assistant'

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || ''

    // Call Ollama API
    const ollamaResponse = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        prompt: userMessage,
        stream: false,
        options: {
          temperature: 0.7,
          num_ctx: 4096,
        }
      }),
    })

    if (!ollamaResponse.ok) {
      console.error('Ollama API error:', ollamaResponse.statusText)
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      )
    }

    const ollamaData = await ollamaResponse.json()
    
    return NextResponse.json({
      message: {
        role: 'assistant',
        content: ollamaData.response || 'Hello my friend! How can I help you today?'
      }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Glo Club AI Assistant API is running',
    model: process.env.OLLAMA_MODEL_NAME || 'glo-assistant',
    endpoint: '/api/chat'
  })
}
