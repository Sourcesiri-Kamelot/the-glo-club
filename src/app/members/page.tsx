import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const mockMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    profession: "Portrait Photographer",
    membershipType: "Pro",
    location: "Baltimore, MD",
    bio: "Specializing in natural light portraits and creative headshots",
    website: "sarahchen.com",
    instagram: "@sarahchenphoto",
    email: "sarah@sarahchen.com",
    avatar: "",
    joinedDate: "Jan 2024"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    profession: "Content Creator",
    membershipType: "Pro",
    location: "Washington, DC",
    bio: "Video content and social media strategy for brands",
    website: "mikerodriguez.co",
    instagram: "@mikecreates",
    email: "mike@mikerodriguez.co",
    avatar: "",
    joinedDate: "Mar 2024"
  },
  {
    id: 3,
    name: "Emma Thompson",
    profession: "Brand Designer",
    membershipType: "Basic",
    location: "Annapolis, MD",
    bio: "Creating visual identities that tell compelling stories",
    website: "emmathompson.design",
    instagram: "@emmathompsondesign",
    email: "hello@emmathompson.design",
    avatar: "",
    joinedDate: "Feb 2024"
  },
  {
    id: 4,
    name: "Alex Johnson",
    profession: "Podcast Producer",
    membershipType: "Pro",
    location: "Baltimore, MD",
    bio: "Audio storytelling and podcast production specialist",
    website: "alexjohnsonpodcasts.com",
    instagram: "@alexjpodcasts",
    email: "alex@alexjohnsonpodcasts.com",
    avatar: "",
    joinedDate: "Dec 2023"
  },
  {
    id: 5,
    name: "Lisa Park",
    profession: "Fashion Photographer",
    membershipType: "Premium",
    location: "Silver Spring, MD",
    bio: "Editorial and commercial fashion photography",
    website: "lisapark.photo",
    instagram: "@lisaparkphoto",
    email: "lisa@lisapark.photo",
    avatar: "",
    joinedDate: "Nov 2023"
  },
  {
    id: 6,
    name: "David Kim",
    profession: "Video Editor",
    membershipType: "Basic",
    location: "Rockville, MD",
    bio: "Post-production specialist for commercials and documentaries",
    website: "davidkim.video",
    instagram: "@davidkimvideo",
    email: "david@davidkim.video",
    avatar: "",
    joinedDate: "Apr 2024"
  }
]

export default function MembersPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Member Directory
            </h1>
            <p className="text-gray-600 mt-2">Connect with fellow Glo Club professionals</p>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Search members by name or profession..." 
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">All</Button>
                  <Button variant="outline" size="sm">Pro</Button>
                  <Button variant="outline" size="sm">Premium</Button>
                  <Button variant="outline" size="sm">Basic</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-sm">{member.profession}</CardDescription>
                    <div className="flex justify-center mt-2">
                      <Badge 
                        className={
                          member.membershipType === 'Premium' 
                            ? 'bg-amber-100 text-amber-700'
                            : member.membershipType === 'Pro'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {member.membershipType}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">{member.location}</p>
                    <p className="text-sm text-gray-800">{member.bio}</p>
                  </div>
                  
                  {/* Contact Links */}
                  <div className="flex justify-center space-x-4 text-sm">
                    <a 
                      href={`https://${member.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🌐 Website
                    </a>
                    <a 
                      href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📷 Instagram
                    </a>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Connect
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                    >
                      Message
                    </Button>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500 pt-2">
                    Member since {member.joinedDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="px-8">
              Load More Members
            </Button>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
