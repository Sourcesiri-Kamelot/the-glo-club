"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useForm } from "react-hook-form"

interface ProfileFormData {
  firstName: string
  lastName: string
  bio: string
  profession: string
  website: string
  instagram: string
}

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      bio: "Professional photographer and creative director",
      profession: "Photographer",
      website: "johndoe.com",
      instagram: "@johndoe"
    }
  })

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2">Customize your Glo Club profile</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Profile Preview */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>How others see you</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24">
                    {profileImage ? (
                      <AvatarImage src={profileImage} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                        JD
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-gray-600">Photographer</p>
                  <Badge className="bg-purple-100 text-purple-700 mt-2">Pro Member</Badge>
                </div>
                
                <p className="text-sm text-gray-600">
                  Professional photographer and creative director
                </p>
                
                <div className="flex justify-center space-x-4 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">johndoe.com</a>
                  <a href="#" className="text-blue-600 hover:underline">@johndoe</a>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        {...register("firstName", { required: "First name is required" })}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        {...register("lastName", { required: "Last name is required" })}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      {...register("profession")}
                      placeholder="e.g., Photographer, Designer, Content Creator"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      {...register("bio")}
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        {...register("website")}
                        placeholder="yourwebsite.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        {...register("instagram")}
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
