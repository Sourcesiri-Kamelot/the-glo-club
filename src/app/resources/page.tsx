import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Resource {
  id: number
  title: string
  type: 'template' | 'ebook' | 'guide' | 'magazine'
  category: string
  description: string
  downloadUrl: string
  fileSize: string
  downloads: number
  isPremium: boolean
  thumbnail: string
  author: string
  publishDate: string
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: "Professional Portrait Lighting Guide",
    type: "ebook",
    category: "Photography",
    description: "Complete guide to mastering portrait lighting techniques with natural and studio light.",
    downloadUrl: "/downloads/portrait-lighting-guide.pdf",
    fileSize: "12.5 MB",
    downloads: 234,
    isPremium: false,
    thumbnail: "",
    author: "Sarah Chen",
    publishDate: "2024-08-15"
  },
  {
    id: 2,
    title: "Brand Identity Template Pack",
    type: "template",
    category: "Design",
    description: "Professional brand identity templates including logos, business cards, and style guides.",
    downloadUrl: "/downloads/brand-identity-pack.zip",
    fileSize: "45.2 MB",
    downloads: 156,
    isPremium: true,
    thumbnail: "",
    author: "Emma Thompson",
    publishDate: "2024-08-20"
  },
  {
    id: 3,
    title: "Glo Club Monthly - September 2024",
    type: "magazine",
    category: "Magazine",
    description: "Monthly magazine featuring member spotlights, industry trends, and creative inspiration.",
    downloadUrl: "/downloads/glo-monthly-sep-2024.pdf",
    fileSize: "28.7 MB",
    downloads: 89,
    isPremium: false,
    thumbnail: "",
    author: "Glo Club Editorial",
    publishDate: "2024-09-01"
  },
  {
    id: 4,
    title: "Video Production Workflow",
    type: "guide",
    category: "Video",
    description: "Step-by-step workflow for professional video production from pre to post.",
    downloadUrl: "/downloads/video-workflow-guide.pdf",
    fileSize: "8.3 MB",
    downloads: 178,
    isPremium: false,
    thumbnail: "",
    author: "Mike Rodriguez",
    publishDate: "2024-08-25"
  },
  {
    id: 5,
    title: "Social Media Content Templates",
    type: "template",
    category: "Marketing",
    description: "Ready-to-use social media templates for Instagram, LinkedIn, and Facebook.",
    downloadUrl: "/downloads/social-media-templates.zip",
    fileSize: "67.1 MB",
    downloads: 312,
    isPremium: true,
    thumbnail: "",
    author: "Lisa Park",
    publishDate: "2024-08-10"
  },
  {
    id: 6,
    title: "Podcast Setup & Equipment Guide",
    type: "ebook",
    category: "Audio",
    description: "Everything you need to know about setting up a professional podcast studio.",
    downloadUrl: "/downloads/podcast-setup-guide.pdf",
    fileSize: "15.8 MB",
    downloads: 145,
    isPremium: false,
    thumbnail: "",
    author: "Alex Johnson",
    publishDate: "2024-08-18"
  }
]

const categories = ["All", "Photography", "Design", "Video", "Audio", "Marketing", "Magazine"]

export default function ResourcesPage() {
  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-700'
      case 'ebook': return 'bg-green-100 text-green-700'
      case 'guide': return 'bg-purple-100 text-purple-700'
      case 'magazine': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'template': return '📋'
      case 'ebook': return '📚'
      case 'guide': return '📖'
      case 'magazine': return '📰'
      default: return '📄'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resource Library
            </h1>
            <p className="text-gray-600 mt-2">Templates, guides, ebooks, and monthly magazines</p>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Search resources..." 
                  className="flex-1"
                />
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button key={category} variant="outline" size="sm">
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Resource */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <CardTitle>Featured Resource</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Glo Club Monthly - September 2024</h3>
                  <p className="text-gray-700 mb-4">
                    This month's edition features member spotlights, industry trends, creative challenges, 
                    and exclusive interviews with leading professionals in photography and design.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>📄 28.7 MB</span>
                    <span>📥 89 downloads</span>
                    <span>📅 Sep 1, 2024</span>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <Link href="/resources/magazine">Read Magazine</Link>
                  </Button>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-sm text-gray-600">Latest Issue Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResources.map(resource => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)} {resource.type}
                    </Badge>
                    {resource.isPremium && (
                      <Badge className="bg-amber-100 text-amber-700">Premium</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>📁 {resource.category}</span>
                      <span>👤 {resource.author}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>📄 {resource.fileSize}</span>
                      <span>📥 {resource.downloads} downloads</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Published: {new Date(resource.publishDate).toLocaleDateString()}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={resource.isPremium ? "default" : "outline"}
                      asChild
                    >
                      <Link href={`/resources/download/${resource.id}`}>
                        {resource.isPremium ? "Premium Download" : "Free Download"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Library Statistics</CardTitle>
              <CardDescription>Resource usage and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockResources.length}</div>
                  <div className="text-sm text-gray-600">Total Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mockResources.filter(r => !r.isPremium).length}
                  </div>
                  <div className="text-sm text-gray-600">Free Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {mockResources.filter(r => r.isPremium).length}
                  </div>
                  <div className="text-sm text-gray-600">Premium Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {mockResources.reduce((sum, r) => sum + r.downloads, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
