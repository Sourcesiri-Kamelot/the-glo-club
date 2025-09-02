"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Event {
  id: number
  title: string
  type: 'workshop' | 'networking' | 'social'
  date: string
  time: string
  location: string
  description: string
  attendees: number
  maxAttendees: number
  isRegistered: boolean
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Glo Network & Workshop: Portrait Lighting",
    type: "workshop",
    date: "2024-09-15",
    time: "2:00 PM - 5:00 PM",
    location: "Main Studio",
    description: "Master the art of portrait lighting with professional techniques and hands-on practice.",
    attendees: 12,
    maxAttendees: 15,
    isRegistered: true
  },
  {
    id: 2,
    title: "Glo Eat and Meet: September Mixer",
    type: "social",
    date: "2024-09-22",
    time: "6:00 PM - 9:00 PM",
    location: "Lounge Area",
    description: "Casual networking dinner with fellow creatives. Great food and meaningful conversations.",
    attendees: 18,
    maxAttendees: 25,
    isRegistered: false
  },
  {
    id: 3,
    title: "Glo Network & Workshop: Video Production",
    type: "workshop",
    date: "2024-09-29",
    time: "1:00 PM - 4:00 PM",
    location: "Video Studio",
    description: "Learn professional video production techniques from pre-production to post.",
    attendees: 8,
    maxAttendees: 12,
    isRegistered: false
  },
  {
    id: 4,
    title: "Creative Networking Happy Hour",
    type: "networking",
    date: "2024-10-05",
    time: "5:30 PM - 8:00 PM",
    location: "Rooftop Terrace",
    description: "Informal networking session with drinks and light appetizers.",
    attendees: 22,
    maxAttendees: 30,
    isRegistered: true
  }
]

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockEvents.filter(event => event.date === dateStr)
  }

  const getEventTypeColor = (type: Event['type']) => {
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
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Events Calendar
            </h1>
            <p className="text-gray-600 mt-2">Glo Network & Workshop • Glo Eat and Meet • Networking</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{monthNames[currentMonth]} {currentYear}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">←</Button>
                    <Button variant="outline" size="sm">→</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {emptyDays.map(day => (
                    <div key={`empty-${day}`} className="p-2 h-20"></div>
                  ))}
                  
                  {days.map(day => {
                    const dayEvents = getEventsForDate(day)
                    const isToday = day === currentDate.getDate() && 
                                   currentMonth === currentDate.getMonth() && 
                                   currentYear === currentDate.getFullYear()
                    
                    return (
                      <div 
                        key={day} 
                        className={`p-2 h-20 border rounded cursor-pointer hover:bg-gray-50 ${
                          isToday ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                      >
                        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div 
                              key={event.id} 
                              className="text-xs p-1 rounded bg-blue-100 text-blue-700 truncate"
                            >
                              {event.title.split(':')[0]}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next events you won't want to miss</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)} size="sm">
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                      <div>🕐 {event.time}</div>
                      <div>📍 {event.location}</div>
                      <div>👥 {event.attendees}/{event.maxAttendees} attending</div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3"
                      variant={event.isRegistered ? "outline" : "default"}
                      asChild
                    >
                      <Link href={`/events/${event.id}`}>
                        {event.isRegistered ? "Registered ✓" : "Register"}
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* All Events List */}
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Complete list of upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        {event.isRegistered && (
                          <Badge variant="outline" className="text-green-600">Registered</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>🕐 {event.time}</span>
                        <span>📍 {event.location}</span>
                        <span>👥 {event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
