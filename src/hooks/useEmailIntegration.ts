"use client"

import { useState } from 'react'

interface EmailData {
  userEmail: string
  userName: string
  inquiryType: string
  message: string
  subject: string
}

export function useEmailIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendInquiry = async (data: EmailData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'joe@glowopticalstudios.com',
          subject: data.subject,
          message: data.message,
          inquiryType: data.inquiryType,
          userInfo: {
            firstName: data.userName.split(' ')[0] || data.userName,
            lastName: data.userName.split(' ')[1] || '',
            email: data.userEmail,
            phone: 'Not provided',
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      const result = await response.json()
      return result

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send inquiry'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const testEmailSystem = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/email', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Email test failed')
      }

      const result = await response.json()
      return result

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Email test failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendInquiry,
    testEmailSystem,
    isLoading,
    error
  }
}
