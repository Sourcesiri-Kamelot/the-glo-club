"use client"

import { useState } from "react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

interface BookingFormData {
  date: string
  startTime: string
  duration: number
  studioType: string
  purpose: string
  notes: string
}

interface Booking {
  id: number
  date: string
  startTime: string
  duration: number
  studioType: string
  purpose: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

const mockBookings: Booking[] = [
  {
    id: 1,
    date: "2024-09-10",
    startTime: "14:00",
    duration: 2,
    studioType: "Main Studio",
    purpose: "Portrait Session",
    status: "confirmed"
  },
  {
    id: 2,
    date: "2024-09-18",
    startTime: "10:00",
    duration: 1,
    studioType: "Video Studio",
    purpose: "Content Creation",
    status: "pending"
  }
]

const studioTypes = [
  { id: 'main', name: 'Main Studio', description: 'Full lighting setup, backdrop options' },
  { id: 'video', name: 'Video Studio', description: 'Video equipment, green screen available' },
  { id: 'natural', name: 'Natural Light Studio', description: 'Large windows, minimal equipment' },
  { id: 'podcast', name: 'Podcast Room', description: 'Audio recording setup, soundproofed' }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>()

  // Calculate used hours this month
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const usedHours = bookings
    .filter(booking => {
      const bookingDate = new Date(booking.date)
      return bookingDate.getMonth() === currentMonth && 
             bookingDate.getFullYear() === currentYear &&
             booking.status === 'confirmed'
    })
    .reduce((total, booking) => total + booking.duration, 0)

  const remainingHours = Math.max(0, 2 - usedHours)

  const onSubmit = (data: BookingFormData) => {
    const newBooking: Booking = {
      id: bookings.length + 1,
      date: data.date,
      startTime: data.startTime,
      duration: data.duration,
      studioType: studioTypes.find(s => s.id === data.studioType)?.name || '',
      purpose: data.purpose,
      status: 'pending'
    }
    
    setBookings([...bookings, newBooking])
    setShowBookingForm(false)
    reset()
  }

  const cancelBooking = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Studio Booking
            </h1>
            <p className="text-gray-600 mt-2">Reserve your studio time • 2 hours included monthly</p>
          </div>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Studio Usage</CardTitle>
              <CardDescription>Track your included studio hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{usedHours}</div>
                  <div className="text-sm text-gray-600">Hours Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{remainingHours}</div>
                  <div className="text-sm text-gray-600">Hours Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                  <div className="text-sm text-gray-600">Monthly Allowance</div>
                </div>
                <div className="text-center">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((usedHours / 2) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{Math.round((usedHours / 2) * 100)}% Used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Booking Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Book Studio Time</CardTitle>
                    <CardDescription>Reserve your preferred studio and time slot</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {showBookingForm ? 'Cancel' : 'New Booking'}
                  </Button>
                </div>
              </CardHeader>
              
              {showBookingForm && (
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          type="date"
                          {...register("date", { required: "Date is required" })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.date && (
                          <p className="text-sm text-red-500">{errors.date.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <select
                          {...register("startTime", { required: "Start time is required" })}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        {errors.startTime && (
                          <p className="text-sm text-red-500">{errors.startTime.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration (hours)</Label>
                        <select
                          {...register("duration", { required: "Duration is required" })}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="">Select duration</option>
                          <option value={1}>1 hour</option>
                          <option value={2}>2 hours</option>
                          <option value={3}>3 hours</option>
                          <option value={4}>4 hours</option>
                        </select>
                        {errors.duration && (
                          <p className="text-sm text-red-500">{errors.duration.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="studioType">Studio Type</Label>
                        <select
                          {...register("studioType", { required: "Studio type is required" })}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="">Select studio</option>
                          {studioTypes.map(studio => (
                            <option key={studio.id} value={studio.id}>{studio.name}</option>
                          ))}
                        </select>
                        {errors.studioType && (
                          <p className="text-sm text-red-500">{errors.studioType.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input
                        {...register("purpose", { required: "Purpose is required" })}
                        placeholder="e.g., Portrait session, Product photography, Video content"
                      />
                      {errors.purpose && (
                        <p className="text-sm text-red-500">{errors.purpose.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <textarea
                        {...register("notes")}
                        className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md"
                        placeholder="Any special requirements or notes..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      Submit Booking Request
                    </Button>
                  </form>
                </CardContent>
              )}
            </Card>

            {/* Studio Types */}
            <Card>
              <CardHeader>
                <CardTitle>Available Studios</CardTitle>
                <CardDescription>Choose the right space for your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {studioTypes.map(studio => (
                  <div key={studio.id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{studio.name}</h4>
                    <p className="text-sm text-gray-600">{studio.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Current Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
              <CardDescription>Manage your current and upcoming reservations</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No bookings yet. Create your first booking above!</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{booking.studioType}</h4>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
                          <span>🕐 {booking.startTime}</span>
                          <span>⏱️ {booking.duration}h</span>
                          <span>🎯 {booking.purpose}</span>
                        </div>
                      </div>
                      {booking.status !== 'cancelled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
