import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      </div>
      
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 border-blue-500/30 px-4 py-2">
              Professional Production Community
            </Badge>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              The Glo Club
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl max-w-2xl mx-auto">
            A members-only social and production club for creators, podcasters, and media professionals. 
            Join our vibrant community at Glow Optical Studios.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Link href="/signup?tier=basic">
                Join for $99/month
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-300 hover:bg-white hover:text-gray-900 px-8 py-3 text-lg">
              <Link href="/contact">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2hrs</div>
              <div className="text-sm text-gray-400">Monthly Studio Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2</div>
              <div className="text-sm text-gray-400">Exclusive Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50%</div>
              <div className="text-sm text-gray-400">Merch Discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Community Access</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  )
}

export { HeroSection }
