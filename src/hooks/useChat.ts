"use client"

import { useState, useCallback } from 'react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello future star! Welcome to the beginning of innovation and wealth for your brand! Whether you need production guidance, creative strategies, event info, or studio booking - I\'m here to elevate your success. The Glo Club is your gateway to creative prosperity! 🌟✨',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      
      // Add error message to chat
      const errorResponse: ChatMessage = {
        role: 'assistant',
        content: 'Future star, I\'m experiencing some technical difficulties right now, but your success journey continues! Please try again in a moment, or contact our support team at (410) 775-8186. The Glo Club team is here to fuel your brand\'s growth! 🚀💎',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello future star! Welcome to the beginning of innovation and wealth for your brand! Whether you need production guidance, creative strategies, event info, or studio booking - I\'m here to elevate your success. The Glo Club is your gateway to creative prosperity! 🌟✨',
        timestamp: new Date()
      }
    ])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  }
}
