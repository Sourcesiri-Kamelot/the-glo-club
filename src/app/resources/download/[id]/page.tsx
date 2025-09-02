"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockResources: Record<number, any> = {
  1: {
    id: 1,
    title: "Professional Portrait Lighting Guide",
    type: "ebook",
    category: "Photography",
    description: "Complete guide to mastering portrait lighting techniques with natural and studio light.",
    fullDescription: "This comprehensive 45-page ebook covers everything you need to know about portrait lighting. From basic natural light techniques to advanced studio setups, you'll learn how to create stunning portraits that stand out. Includes practical exercises, lighting diagrams, and real-world examples.",
    downloadUrl: "/downloads/portrait-lighting-guide.pdf",
    fileSize: "12.5 MB",
    downloads: 234,
    isPremium: false,
    thumbnail: "",
    author: "Sarah Chen",
    authorBio: "Professional portrait photographer with 10+ years experience",
    publishDate: "2024-08-15",
    contents: [
      "Chapter 1: Understanding Light",
      "Chapter 2: Natural Light Techniques",
      "Chapter 3: Studio Lighting Basics",
      "Chapter 4: Advanced Lighting Setups",
      "Chapter 5: Creative Lighting Effects",
      "Chapter 6: Post-Processing Tips"
    ],
    requirements: ["Basic photography knowledge", "Camera (DSLR or mirrorless)"],
    tags: ["Photography", "Lighting", "Portraits", "Studio"]
  },
  2: {
    id: 2,
    title: "Brand Identity Template Pack",
    type: "template",
    category: "Design",
    description: "Professional brand identity templates including logos, business cards, and style guides.",
    fullDescription: "Complete brand identity package with 25+ templates including logo variations, business cards, letterheads, social media templates, and comprehensive style guides. All files provided in Adobe Creative Suite formats.",
    downloadUrl: "/downloads/brand-identity-pack.zip",
    fileSize: "45.2 MB",
    downloads: 156,
    isPremium: true,
    thumbnail: "",
    author: "Emma Thompson",
    authorBio: "Brand designer specializing in visual identity systems",
    publishDate: "2024-08-20",
    contents: [
      "Logo Templates (AI, EPS, PNG)",
      "Business Card Designs",
      "Letterhead Templates",
      "Social Media Kit",
      "Brand Guidelines Template",
      "Color Palette Swatches"
    ],
    requirements: ["Adobe Creative Suite", "Basic design knowledge"],
    tags: ["Design", "Branding", "Templates", "Identity"]
  }
}

export default function DownloadPage() {
  const params = useParams()
  const router = useRouter()
  const resourceId = parseInt(params.id as string)
  const resource = mockResources[resourceId]
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    if (downloadStarted && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 100))
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [downloadStarted, downloadProgress])

  if (!resource) {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
                <Button onClick={() => router.push('/resources')}>Back to Resources</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  const handleDownload = () => {
    setDownloadStarted(true)
    setDownloadProgress(0)
    
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = resource.downloadUrl
      link.download = resource.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 2000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-700'
      case 'ebook': return 'bg-green-100 text-green-700'
      case 'guide': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return '📋'
      case 'ebook': return '📚'
      case 'guide': return '📖'
      default: return '📄'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Back Button */}
          <Button variant="outline" onClick={() => router.push('/resources')}>
            ← Back to Resources
          </Button>

          {/* Resource Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)} {resource.type}
                    </Badge>
                    {resource.isPremium && (
                      <Badge className="bg-amber-100 text-amber-700">Premium</Badge>
                    )}
                    <Badge variant="outline">{resource.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{resource.title}</CardTitle>
                  <CardDescription className="text-lg">{resource.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-semibold">File Size</p>
                      <p className="text-gray-600">{resource.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📥</span>
                    <div>
                      <p className="font-semibold">Downloads</p>
                      <p className="text-gray-600">{resource.downloads} times</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Published</p>
                      <p className="text-gray-600">{new Date(resource.publishDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold">Access</p>
                      <p className="text-gray-600">{resource.isPremium ? 'Premium Members Only' : 'Free for All Members'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Author</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {resource.author.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{resource.author}</p>
                        <p className="text-sm text-gray-600">{resource.authorBio}</p>
                      </div>
                    </div>
                  </div>
                  
                  {downloadStarted ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">
                          {downloadProgress < 100 ? 'Preparing Download...' : 'Download Complete!'}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-center text-gray-600">{downloadProgress}%</p>
                    </div>
                  ) : (
                    <Button 
                      className={`w-full ${resource.isPremium ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                      onClick={handleDownload}
                    >
                      {resource.isPremium ? '⭐ Premium Download' : '📥 Free Download'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resource Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{resource.fullDescription}</p>
                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {resource.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resource.contents.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Download Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Download Information</CardTitle>
              <CardDescription>File details and access information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{resource.fileSize}</div>
                  <div className="text-sm text-gray-600">File Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{resource.downloads}</div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {resource.isPremium ? 'Premium' : 'Free'}
                  </div>
                  <div className="text-sm text-gray-600">Access Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
