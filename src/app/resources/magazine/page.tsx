"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface MagazineIssue {
  id: number
  title: string
  month: string
  year: number
  coverImage: string
  totalPages: number
  publishDate: string
  description: string
  featured: boolean
}

const mockIssues: MagazineIssue[] = [
  {
    id: 1,
    title: "Creative Horizons",
    month: "September",
    year: 2024,
    coverImage: "",
    totalPages: 32,
    publishDate: "2024-09-01",
    description: "Member spotlights, lighting techniques, and industry trends",
    featured: true
  },
  {
    id: 2,
    title: "Summer Inspiration",
    month: "August",
    year: 2024,
    coverImage: "",
    totalPages: 28,
    publishDate: "2024-08-01",
    description: "Outdoor photography, creative challenges, and success stories",
    featured: false
  },
  {
    id: 3,
    title: "Studio Mastery",
    month: "July",
    year: 2024,
    coverImage: "",
    totalPages: 30,
    publishDate: "2024-07-01",
    description: "Studio techniques, equipment reviews, and member interviews",
    featured: false
  }
]

export default function MagazinePage() {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue>(mockIssues[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'cover' | 'reader'>('cover')

  const handleReadIssue = (issue: MagazineIssue) => {
    setSelectedIssue(issue)
    setCurrentPage(1)
    setViewMode('reader')
  }

  const nextPage = () => {
    if (currentPage < selectedIssue.totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (viewMode === 'reader') {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Reader Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode('cover')}
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  ← Back to Issues
                </Button>
                <div>
                  <h1 className="font-bold">{selectedIssue.title}</h1>
                  <p className="text-sm text-gray-400">{selectedIssue.month} {selectedIssue.year}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {selectedIssue.totalPages}
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="text-white border-gray-600 hover:bg-gray-700"
                  >
                    ←
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === selectedIssue.totalPages}
                    className="text-white border-gray-600 hover:bg-gray-700"
                  >
                    →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Magazine Reader */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-white text-black rounded-lg shadow-2xl max-w-4xl w-full aspect-[8.5/11] flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedIssue.title}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {selectedIssue.month} {selectedIssue.year} • Page {currentPage}
                </p>
                
                {currentPage === 1 ? (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-2xl font-semibold">Cover Story</h3>
                    <p className="text-gray-700 max-w-md mx-auto">
                      {selectedIssue.description}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      {currentPage <= 5 ? "Table of Contents" :
                       currentPage <= 15 ? "Member Spotlight" :
                       currentPage <= 25 ? "Industry Insights" :
                       "Creative Showcase"}
                    </h3>
                    <div className="text-gray-700 space-y-4">
                      <p>This is page {currentPage} of the {selectedIssue.month} {selectedIssue.year} issue.</p>
                      <p>Content would be displayed here in a real magazine viewer.</p>
                      <div className="bg-gray-100 p-4 rounded">
                        <p className="text-sm">
                          📝 In a production environment, this would display actual magazine content 
                          loaded from Azure CDN or similar content delivery system.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reader Footer */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  📥 Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  🔖 Bookmark
                </Button>
              </div>
              
              <div className="w-64">
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(currentPage / selectedIssue.totalPages) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Glo Club Magazine
              </h1>
              <p className="text-gray-600 mt-2">Monthly digital magazine for creative professionals</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/resources">← Back to Resources</Link>
            </Button>
          </div>

          {/* Featured Issue */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <CardTitle>Latest Issue</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {mockIssues[0].title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    {mockIssues[0].month} {mockIssues[0].year}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {mockIssues[0].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>📄 {mockIssues[0].totalPages} pages</span>
                    <span>📅 {new Date(mockIssues[0].publishDate).toLocaleDateString()}</span>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => handleReadIssue(mockIssues[0])}
                  >
                    Read Now
                  </Button>
                </div>
                <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                  <div className="text-8xl mb-4">📰</div>
                  <Badge className="bg-green-100 text-green-700">New Issue</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Issues */}
          <Card>
            <CardHeader>
              <CardTitle>All Issues</CardTitle>
              <CardDescription>Browse our complete magazine archive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockIssues.map(issue => (
                  <Card key={issue.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center pb-4">
                      <div className="bg-gray-100 rounded-lg p-8 mb-4">
                        <div className="text-6xl mb-2">📰</div>
                        <Badge className={issue.featured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {issue.featured ? "Latest" : "Archive"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                      <CardDescription>
                        {issue.month} {issue.year}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0 text-center">
                      <p className="text-sm text-gray-600 mb-4">{issue.description}</p>
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
                        <span>📄 {issue.totalPages} pages</span>
                        <span>📅 {new Date(issue.publishDate).toLocaleDateString()}</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleReadIssue(issue)}
                      >
                        Read Issue
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Magazine Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Magazine Statistics</CardTitle>
              <CardDescription>Publication metrics and readership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockIssues.length}</div>
                  <div className="text-sm text-gray-600">Total Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mockIssues.reduce((sum, issue) => sum + issue.totalPages, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">Monthly</div>
                  <div className="text-sm text-gray-600">Publication Schedule</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">Free</div>
                  <div className="text-sm text-gray-600">For All Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
