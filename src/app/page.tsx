import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Membership Plans */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Membership Plans
            </h2>
            <p className="text-xl text-gray-600">Join The Glo Club community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-2 hover:border-blue-300 transition-all">
              <CardHeader>
                <Badge className="w-fit mb-2">Basic</Badge>
                <CardTitle className="text-2xl">Studio Access</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">$99<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    2 hours studio access/month
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Community access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Monthly magazine
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => window.location.href = '/signup?tier=basic'}>
                  Get Started - $99/month
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-purple-300 hover:border-purple-400 transition-all">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-blue-600 text-white px-3 py-1 text-sm">
                Popular
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-purple-100 text-purple-700">Pro</Badge>
                <CardTitle className="text-2xl">Full Access</CardTitle>
                <CardDescription>Everything you need</CardDescription>
                <div className="text-3xl font-bold">$199<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Unlimited studio access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    All events included
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Priority booking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Resource library access
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600" onClick={() => window.location.href = '/signup?tier=pro'}>
                  Join Pro - $199/month
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-amber-300 transition-all">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-amber-100 text-amber-700">Premium</Badge>
                <CardTitle className="text-2xl">VIP Experience</CardTitle>
                <CardDescription>For serious creators</CardDescription>
                <div className="text-3xl font-bold">$399<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    24/7 studio access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Personal consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Equipment included
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Custom workshops
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" onClick={() => window.location.href = '/contact'}>
                  Contact for Premium - $399/month
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Connect, learn, and grow with fellow creators</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Glo Network & Workshop</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Monthly networking event with hands-on workshops for skill development and community building.
                </p>
                <Button asChild>
                  <Link href="/events">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Glo Eat and Meet</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Casual dining experiences where members connect over great food and meaningful conversations.
                </p>
                <Button asChild>
                  <Link href="/events">View Schedule</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </div>
  )
}
