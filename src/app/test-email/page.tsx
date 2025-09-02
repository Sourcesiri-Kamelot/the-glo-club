"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmailIntegration } from "@/hooks/useEmailIntegration"

export default function TestEmailPage() {
  const [testResult, setTestResult] = useState<string>("")
  const { testEmailSystem, isLoading, error } = useEmailIntegration()

  const handleTestEmail = async () => {
    try {
      const result = await testEmailSystem()
      setTestResult(`✅ Success! Test email sent to kiwonbowens@helo-im.ai at ${result.timestamp}`)
    } catch (err) {
      setTestResult(`❌ Failed: ${error || 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Integration Test
            </CardTitle>
            <CardDescription>
              Test the Glo Club email system integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Details:</h3>
              <ul className="text-sm space-y-1">
                <li>• Test email will be sent to: kiwonbowens@helo-im.ai</li>
                <li>• System routes to: joe@glowopticalstudios.com</li>
                <li>• Includes department routing logic</li>
                <li>• Tests confirmation email system</li>
              </ul>
            </div>

            <Button 
              onClick={handleTestEmail}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isLoading ? "Sending Test Email..." : "🧪 Test Email System"}
            </Button>

            {testResult && (
              <div className={`p-4 rounded-lg ${
                testResult.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                <p className="font-medium">{testResult}</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Email Routing System:</h3>
              <div className="text-sm space-y-2">
                <div>📧 <strong>General:</strong> joe@glowopticalstudios.com | (410) 775-8186</div>
                <div>👥 <strong>HR:</strong> joe@glowopticalstudios.com | (410) 775-9727</div>
                <div>📰 <strong>Media:</strong> press@glowopticalstudios.com | (410) 775-5161</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>⚠️ Make sure to configure EMAIL_USER and EMAIL_PASS in .env.local</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
