import { CONTACT_INFO } from '@/lib/constants'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">About The Glo Club</h1>
        <p className="mt-2 text-gray-600">Learn more about our mission and community</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            The Glo Club is a members-only social and production club designed to provide a comprehensive 
            and innovative platform for creators, podcasters, and media professionals.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Housed at the Glow Optical Studios, our mission is to foster a vibrant community while 
            offering valuable resources and exclusive access to a state-of-the-art production facility.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>2 hours of monthly studio time for podcasting, video, and photo shoots</li>
            <li>Exclusive monthly events: Glo Network & Workshop and Glo Eat and Meet</li>
            <li>Vibrant online community hub for networking and collaboration</li>
            <li>Free marketing resources, templates, and monthly magazine</li>
            <li>Professional headshots and member directory</li>
            <li>50% discount on club merchandise</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-8">
            For just $50 per month, become part of a thriving community of creators and professionals 
            who are passionate about media production and networking.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-sm text-gray-600 mb-2">For all questions or general inquiries, contact us by phone, or use the "Contact Form" below.</p>
              <p className="text-blue-600 font-medium">{CONTACT_INFO.GENERAL.PHONE}</p>
              <p className="text-sm text-gray-500">{CONTACT_INFO.GENERAL.HOURS}</p>
              <p className="text-blue-600 font-medium mt-2">{CONTACT_INFO.GENERAL.EMAIL}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">HR & Employment</h3>
              <p className="text-sm text-gray-600 mb-2">For employment verification of a current or former Glow Optical Studios employee, or any other HR related matter.</p>
              <p className="text-blue-600 font-medium">{CONTACT_INFO.HR.PHONE}</p>
              <p className="text-sm text-gray-500">{CONTACT_INFO.HR.HOURS}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Media Inquiries</h3>
              <p className="text-sm text-gray-600 mb-2">For press or media inquiries, please contact us by phone or by email.</p>
              <p className="text-blue-600 font-medium">{CONTACT_INFO.MEDIA.PHONE}</p>
              <p className="text-sm text-gray-500">{CONTACT_INFO.MEDIA.HOURS}</p>
              <p className="text-blue-600 font-medium mt-2">{CONTACT_INFO.MEDIA.EMAIL}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
