"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockEvents: Record<number, any> = {
  1: {
    id: 1,
    title: "Glo Network & Workshop: Portrait Lighting",
    type: "workshop",
    date: "2024-09-15",
    time: "2:00 PM - 5:00 PM",
    location: "Main Studio",
    description: "Master the art of portrait lighting with professional techniques and hands-on practice. This comprehensive workshop covers natural light, studio lighting, and creative techniques used by professional photographers.",
    fullDescription: "Join us for an intensive 3-hour workshop focused on portrait lighting mastery. We'll cover everything from basic natural light techniques to advanced studio setups. You'll get hands-on experience with professional equipment and learn how to create stunning portraits that stand out. Perfect for photographers of all skill levels looking to elevate their portrait work.",
    attendees: 12,
    maxAttendees: 15,
    isRegistered: true,
    instructor: "Sarah Chen",
    instructorBio: "Professional portrait photographer with 10+ years experience",
    price: "Free for Pro/Premium members, $25 for Basic members",
    requirements: ["Camera (DSLR or mirrorless)", "Basic photography knowledge helpful but not required"],
    agenda: [
      "2:00 PM - Welcome & Introduction",
      "2:15 PM - Natural Light Techniques",
      "3:00 PM - Studio Lighting Setup",
      "3:45 PM - Hands-on Practice Session",
      "4:30 PM - Review & Q&A",
      "5:00 PM - Wrap-up & Networking"
    ]
  },
  2: {
    id: 2,
    title: "Glo Eat and Meet: September Mixer",
    type: "social",
    date: "2024-09-22",
    time: "6:00 PM - 9:00 PM",
    location: "Lounge Area",
    description: "Casual networking dinner with fellow creatives. Great food and meaningful conversations.",
    fullDescription: "Join fellow Glo Club members for an evening of great food, drinks, and networking. This casual mixer is perfect for meeting new people, sharing ideas, and building lasting professional relationships in a relaxed atmosphere.",
    attendees: 18,
    maxAttendees: 25,
    isRegistered: false,
    instructor: "Community Team",
    instructorBio: "Hosted by the Glo Club community team",
    price: "$35 per person (includes dinner and drinks)",
    requirements: ["Just bring yourself and business cards!"],
    agenda: [
      "6:00 PM - Welcome Reception",
      "6:30 PM - Dinner Service Begins",
      "7:00 PM - Networking Mixer",
      "8:00 PM - Community Spotlight",
      "8:30 PM - Open Networking",
      "9:00 PM - Event Wrap-up"
    ]
  }
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = parseInt(params.id as string)
  const event = mockEvents[eventId as keyof typeof mockEvents]
  const [isRegistered, setIsRegistered] = useState(event?.isRegistered || false)

  if (!event) {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
                <Button onClick={() => router.push('/events')}>Back to Events</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  const handleRSVP = () => {
    setIsRegistered(!isRegistered)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-700'
      case 'networking': return 'bg-green-100 text-green-700'
      case 'social': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Back Button */}
          <Button variant="outline" onClick={() => router.push('/events')}>
            ← Back to Events
          </Button>

          {/* Event Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    {isRegistered && (
                      <Badge variant="outline" className="text-green-600">Registered</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                  <CardDescription className="text-lg">{event.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold">{event.location}</p>
                      <p className="text-gray-600">Glo Club Studios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-semibold">{event.attendees}/{event.maxAttendees} Attending</p>
                      <p className="text-gray-600">{event.maxAttendees - event.attendees} spots remaining</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold">Pricing</p>
                      <p className="text-gray-600">{event.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Instructor</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {event.instructor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{event.instructor}</p>
                        <p className="text-sm text-gray-600">{event.instructorBio}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${isRegistered ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                    onClick={handleRSVP}
                  >
                    {isRegistered ? 'Cancel Registration' : 'Register for Event'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{event.fullDescription}</p>
                <div>
                  <h4 className="font-semibold mb-2">What to Bring:</h4>
                  <ul className="space-y-1">
                    {event.requirements.map((req, index) => (
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
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendees */}
          <Card>
            <CardHeader>
              <CardTitle>Who's Attending</CardTitle>
              <CardDescription>{event.attendees} members registered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: Math.min(event.attendees, 8) }, (_, i) => (
                  <Avatar key={i} className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {event.attendees > 8 && (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    +{event.attendees - 8}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
