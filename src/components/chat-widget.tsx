"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useChat } from "@/hooks/useChat"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { messages, isLoading, sendMessage, clearMessages } = useChat()

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    await sendMessage(inputValue)
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-bounce hover:animate-none transition-all duration-300 hover:scale-110"
        >
          <span className="text-lg sm:text-2xl">🤖</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6 sm:w-96">
      <Card className="shadow-2xl border-2 border-blue-200 animate-in slide-in-from-bottom-4 fade-in duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <CardTitle className="text-lg">Glo Assistant</CardTitle>
                <p className="text-sm opacity-90">Production Expert & Support</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-white hover:bg-white/20"
              >
                🔄
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about production, events, bookings..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                📤
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-xs">
                🎬 Production Expert
              </Badge>
              <Badge variant="outline" className="text-xs">
                💬 24/7 Support
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
