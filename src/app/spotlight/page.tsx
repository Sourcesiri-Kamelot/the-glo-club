import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface SpotlightMember {
  id: number
  name: string
  profession: string
  membershipType: string
  location: string
  bio: string
  achievements: string[]
  featuredWork: string
  website: string
  instagram: string
  joinedDate: string
  spotlightDate: string
  quote: string
  stats: {
    projectsCompleted: number
    yearsExperience: number
    clientsSatisfied: number
    awardsWon: number
  }
}

const spotlightMembers: SpotlightMember[] = [
  {
    id: 1,
    name: "Sarah Chen",
    profession: "Portrait Photographer",
    membershipType: "Pro",
    location: "Baltimore, MD",
    bio: "Sarah specializes in natural light portraits and has been featured in multiple photography magazines. Her work focuses on capturing authentic emotions and creating timeless images.",
    achievements: [
      "Featured in Photography Weekly Magazine",
      "Winner of 2024 Portrait Excellence Award",
      "Published in National Geographic",
      "Speaker at Creative Photography Summit"
    ],
    featuredWork: "Natural Light Portrait Series",
    website: "sarahchen.com",
    instagram: "@sarahchenphoto",
    joinedDate: "Jan 2024",
    spotlightDate: "September 2024",
    quote: "The Glo Club has transformed my creative process. The studio access and community support have been invaluable to my growth as an artist.",
    stats: {
      projectsCompleted: 150,
      yearsExperience: 8,
      clientsSatisfied: 200,
      awardsWon: 5
    }
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    profession: "Content Creator",
    membershipType: "Premium",
    location: "Washington, DC",
    bio: "Mike creates engaging video content for brands and has built a following of over 100K across social platforms. He specializes in storytelling through visual media.",
    achievements: [
      "100K+ Social Media Following",
      "Brand Partnership with Adobe",
      "Viral Video Campaign (2M+ views)",
      "Featured Creator on YouTube"
    ],
    featuredWork: "Brand Storytelling Video Series",
    website: "mikerodriguez.co",
    instagram: "@mikecreates",
    joinedDate: "Mar 2024",
    spotlightDate: "August 2024",
    quote: "The networking opportunities at Glo Club are unmatched. I've collaborated with amazing creators and grown my business significantly.",
    stats: {
      projectsCompleted: 85,
      yearsExperience: 6,
      clientsSatisfied: 45,
      awardsWon: 3
    }
  },
  {
    id: 3,
    name: "Emma Thompson",
    profession: "Brand Designer",
    membershipType: "Pro",
    location: "Annapolis, MD",
    bio: "Emma creates compelling visual identities for startups and established brands. Her design philosophy centers on creating meaningful connections between brands and their audiences.",
    achievements: [
      "Designed for 50+ Startups",
      "Featured in Design Awards 2024",
      "Published Design Templates",
      "Mentor at Design Bootcamp"
    ],
    featuredWork: "Tech Startup Brand Identity Collection",
    website: "emmathompson.design",
    instagram: "@emmathompsondesign",
    joinedDate: "Feb 2024",
    spotlightDate: "July 2024",
    quote: "Being part of Glo Club has connected me with incredible clients and fellow designers. The creative energy here is infectious!",
    stats: {
      projectsCompleted: 120,
      yearsExperience: 7,
      clientsSatisfied: 80,
      awardsWon: 4
    }
  }
]

export default function SpotlightPage() {
  const currentSpotlight = spotlightMembers[0]
  const pastSpotlights = spotlightMembers.slice(1)

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Member Spotlight
            </h1>
            <p className="text-gray-600 mt-2">Celebrating our creative community's achievements</p>
          </div>

          {/* Current Spotlight */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <CardTitle>Featured Member - {currentSpotlight.spotlightDate}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Profile Section */}
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl">
                      {currentSpotlight.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">{currentSpotlight.name}</h2>
                  <p className="text-lg text-gray-600 mb-2">{currentSpotlight.profession}</p>
                  <p className="text-gray-500 mb-4">{currentSpotlight.location}</p>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge className="bg-purple-100 text-purple-700">
                      {currentSpotlight.membershipType} Member
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-700">Spotlight</Badge>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`https://${currentSpotlight.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🌐 Website
                    </a>
                    <a 
                      href={`https://instagram.com/${currentSpotlight.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📷 Instagram
                    </a>
                  </div>
                </div>

                {/* Bio & Quote */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">About {currentSpotlight.name.split(' ')[0]}</h3>
                    <p className="text-gray-700 mb-4">{currentSpotlight.bio}</p>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="italic text-gray-700">"{currentSpotlight.quote}"</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Featured Work</h4>
                    <p className="text-gray-600">{currentSpotlight.featuredWork}</p>
                  </div>
                </div>

                {/* Stats & Achievements */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Professional Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center bg-white p-3 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{currentSpotlight.stats.projectsCompleted}</div>
                        <div className="text-xs text-gray-600">Projects</div>
                      </div>
                      <div className="text-center bg-white p-3 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{currentSpotlight.stats.yearsExperience}</div>
                        <div className="text-xs text-gray-600">Years Exp.</div>
                      </div>
                      <div className="text-center bg-white p-3 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{currentSpotlight.stats.clientsSatisfied}</div>
                        <div className="text-xs text-gray-600">Clients</div>
                      </div>
                      <div className="text-center bg-white p-3 rounded-lg">
                        <div className="text-xl font-bold text-amber-600">{currentSpotlight.stats.awardsWon}</div>
                        <div className="text-xs text-gray-600">Awards</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <div className="space-y-2">
                      {currentSpotlight.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">🏆</span>
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Past Spotlights */}
          <Card>
            <CardHeader>
              <CardTitle>Past Spotlights</CardTitle>
              <CardDescription>Previous featured members of our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {pastSpotlights.map(member => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-gray-600">{member.profession}</p>
                          <Badge className="bg-gray-100 text-gray-700 mt-1" size="sm">
                            {member.spotlightDate}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 mb-3">{member.bio.substring(0, 120)}...</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>🏆 {member.stats.awardsWon} awards</span>
                          <span>📁 {member.stats.projectsCompleted} projects</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nomination */}
          <Card>
            <CardHeader>
              <CardTitle>Nominate a Member</CardTitle>
              <CardDescription>Know someone who deserves recognition? Nominate them for our next spotlight!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  Help us celebrate the amazing work of our community members. Nominations are reviewed monthly 
                  by our editorial team.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Submit Nomination
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Spotlight Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Spotlight Program</CardTitle>
              <CardDescription>Celebrating our community's achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{spotlightMembers.length}</div>
                  <div className="text-sm text-gray-600">Members Featured</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Monthly</div>
                  <div className="text-sm text-gray-600">Feature Schedule</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {spotlightMembers.reduce((sum, m) => sum + m.stats.projectsCompleted, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {spotlightMembers.reduce((sum, m) => sum + m.stats.awardsWon, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Awards Won</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
