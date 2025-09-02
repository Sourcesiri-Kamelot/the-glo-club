"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/events', label: 'Events' },
    { href: '/community', label: 'Community' },
    { href: '/members', label: 'Members' },
    { href: '/spotlight', label: 'Spotlight' },
    { href: '/resources', label: 'Resources' },
    { href: '/booking', label: 'Book Studio' },
    { href: '/profile', label: 'Profile' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Glo Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin</span>
              <Badge className="bg-purple-100 text-purple-700 text-xs">Pro Member</Badge>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors animate-in fade-in slide-in-from-left duration-300 ${
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile User Section */}
              <div className="border-t pt-3 mt-3 animate-in fade-in slide-in-from-bottom duration-300 delay-300">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Admin</p>
                    <Badge className="bg-purple-100 text-purple-700 text-xs">Pro Member</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
