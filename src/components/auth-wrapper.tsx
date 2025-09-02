"use client"

import { useState, useEffect, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthWrapperProps {
  children: ReactNode
  requireAuth?: boolean
}

// Admin credentials - only these people can access
const ADMIN_USERS = [
  { email: "kiwonbowens@helo-im.ai", password: "admin123" },
  { email: "admin@glowopticalstudios.com", password: "glo2024" },
  { email: "manager@glowopticalstudios.com", password: "manager123" }
]

export function AuthWrapper({ children, requireAuth = true }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if already logged in
    const adminToken = localStorage.getItem('glo-admin-token')
    if (adminToken === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if credentials match admin users
    const validAdmin = ADMIN_USERS.find(
      admin => admin.email === email && admin.password === password
    )
    
    if (validAdmin) {
      localStorage.setItem('glo-admin-token', 'authenticated')
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Access denied. Admin credentials required.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('glo-admin-token')
    setIsAuthenticated(false)
    setEmail("")
    setPassword("")
  }

  if (!requireAuth) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-top duration-700 delay-200">
              🔒 Admin Access Only
            </CardTitle>
            <CardDescription className="animate-in slide-in-from-top duration-700 delay-300">
              The Glo Club - Authorized Personnel Only
            </CardDescription>
          </CardHeader>
          <CardContent className="animate-in slide-in-from-bottom duration-700 delay-400">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                🔑 Admin Login
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>🛡️ Authorized access only</p>
              <p>Contact system administrator for access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 text-center text-sm">
        <span>🔒 Admin Mode Active</span>
        <button 
          onClick={handleLogout}
          className="ml-4 underline hover:no-underline"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}
