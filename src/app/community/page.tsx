"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Post {
  id: number
  author: string
  avatar: string
  profession: string
  time: string
  content: string
  image: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isShared: boolean
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "",
    profession: "Portrait Photographer",
    time: "2 hours ago",
    content: "Just wrapped up an amazing studio session! The new lighting setup is incredible. Can't wait to share the results! 📸✨",
    image: "",
    likes: 12,
    comments: 3,
    shares: 1,
    isLiked: false,
    isShared: false
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    avatar: "",
    profession: "Content Creator",
    time: "4 hours ago",
    content: "Thanks to everyone who attended yesterday's Glo Network & Workshop! The energy was amazing. Next session is already in the works 🚀",
    image: "",
    likes: 24,
    comments: 8,
    shares: 5,
    isLiked: true,
    isShared: false
  },
  {
    id: 3,
    author: "Emma Thompson",
    avatar: "",
    profession: "Brand Designer",
    time: "1 day ago",
    content: "Working on a new brand identity project. The creative process never gets old! Love having access to the studio for client presentations.",
    image: "",
    likes: 18,
    comments: 6,
    shares: 2,
    isLiked: false,
    isShared: true
  }
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handleShare = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isShared: !post.isShared,
            shares: post.isShared ? post.shares - 1 : post.shares + 1
          }
        : post
    ))
  }

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ))
      setNewComment("")
      setShowComments(null)
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Feed
            </h1>
            <p className="text-gray-600 mt-2">Connect with fellow Glo Club members</p>
          </div>

          {/* Create Post Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-gray-500 bg-gray-50 hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/community/create">What's on your mind, John?</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="flex-1">
                  📝 Text
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  📷 Photo
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  🎥 Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{post.profession}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">Pro</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  
                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`${post.isLiked ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
                        onClick={() => handleLike(post.id)}
                      >
                        <span className="mr-1">{post.isLiked ? '👍' : '👍'}</span>
                        {post.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      >
                        <span className="mr-1">💬</span>
                        {post.comments}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`${post.isShared ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
                        onClick={() => handleShare(post.id)}
                      >
                        <span className="mr-1">🔄</span>
                        {post.shares}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <span>📤</span>
                    </Button>
                  </div>

                  {/* Comment Section */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex space-x-2">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            size="sm"
                            onClick={() => handleComment(post.id)}
                            disabled={!newComment.trim()}
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                      
                      {/* Sample Comments */}
                      <div className="space-y-2 ml-11">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm">Alex Johnson</span>
                            <span className="text-xs text-gray-500">1h</span>
                          </div>
                          <p className="text-sm">Great work! Looking forward to seeing the final shots.</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm">Lisa Park</span>
                            <span className="text-xs text-gray-500">30m</span>
                          </div>
                          <p className="text-sm">The lighting setup sounds amazing! 🔥</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="px-8">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
