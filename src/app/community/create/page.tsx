"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useForm } from "react-hook-form"

interface PostFormData {
  content: string
}

type PostType = 'text' | 'image' | 'video' | 'meme'

export default function CreatePostPage() {
  const [postType, setPostType] = useState<PostType>('text')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string>("")
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>()

  const onSubmit = (data: PostFormData) => {
    console.log("Post created:", { ...data, postType, mediaFile })
    router.push("/community")
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setMediaFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const postTypeButtons = [
    { type: 'text' as PostType, label: 'Text', icon: '📝' },
    { type: 'image' as PostType, label: 'Photo', icon: '📷' },
    { type: 'video' as PostType, label: 'Video', icon: '🎥' },
    { type: 'meme' as PostType, label: 'Meme', icon: '😂' },
  ]

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Post
            </h1>
            <p className="text-gray-600 mt-2">Share with the Glo Club community</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-purple-100 text-purple-700">Pro Member</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Post Type Selection */}
                <div>
                  <Label>Post Type</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {postTypeButtons.map((button) => (
                      <Button
                        key={button.type}
                        type="button"
                        variant={postType === button.type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPostType(button.type)}
                        className="flex flex-col items-center p-3 h-auto"
                      >
                        <span className="text-lg mb-1">{button.icon}</span>
                        <span className="text-xs">{button.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Content Input */}
                <div>
                  <Label htmlFor="content">
                    {postType === 'text' ? 'What\'s on your mind?' : 'Add a caption...'}
                  </Label>
                  <textarea
                    {...register("content", { required: "Content is required" })}
                    className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md resize-none"
                    placeholder={
                      postType === 'text' 
                        ? "Share your thoughts with the community..."
                        : "Write a caption for your post..."
                    }
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                  )}
                </div>

                {/* Media Upload */}
                {postType !== 'text' && (
                  <div>
                    <Label>
                      {postType === 'image' ? 'Upload Photo' : 
                       postType === 'video' ? 'Upload Video' : 'Upload Meme'}
                    </Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept={
                          postType === 'image' || postType === 'meme' 
                            ? "image/*" 
                            : "video/*"
                        }
                        onChange={handleMediaUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label
                        htmlFor="media-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        {mediaPreview ? (
                          <div className="relative w-full h-full">
                            {postType === 'video' ? (
                              <video 
                                src={mediaPreview} 
                                className="w-full h-full object-cover rounded-lg"
                                controls
                              />
                            ) : (
                              <img 
                                src={mediaPreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <span className="text-2xl mb-2 block">
                              {postType === 'video' ? '🎥' : '📷'}
                            </span>
                            <span className="text-sm text-gray-600">
                              Click to upload {postType === 'video' ? 'video' : 'image'}
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Post to Community
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => router.push("/community")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
