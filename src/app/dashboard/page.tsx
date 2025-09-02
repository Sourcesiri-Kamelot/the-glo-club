import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AuthWrapper } from "@/components/auth-wrapper"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, John
              </h1>
              <p className="text-gray-600">Here's what's happening with your membership</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardDescription>Studio Hours Used</CardDescription>
                <CardTitle className="text-2xl">1.5 / 2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardDescription>Events Attended</CardDescription>
                <CardTitle className="text-2xl">3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-600">+1 this month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardDescription>Membership</CardDescription>
                <CardTitle className="text-lg">Pro Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-100 text-purple-700">Active</Badge>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardDescription>Next Renewal</CardDescription>
                <CardTitle className="text-lg">Sep 15</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">15 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    📅
                  </div>
                  Book Studio Time
                </CardTitle>
                <CardDescription>Reserve your studio session</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    🎉
                  </div>
                  Upcoming Events
                </CardTitle>
                <CardDescription>See what's coming up</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/events">View Events</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    👥
                  </div>
                  Community
                </CardTitle>
                <CardDescription>Connect with members</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/community">Explore</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Studio session booked</p>
                    <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Attended Glo Network & Workshop</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">Completed</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Profile updated</p>
                    <p className="text-sm text-gray-600">1 week ago</p>
                  </div>
                  <Badge variant="outline" className="text-purple-600">Profile</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
