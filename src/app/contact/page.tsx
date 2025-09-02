"use client"

import { useForm } from "react-hook-form"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  inquiryType: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'joe@glowopticalstudios.com',
          subject: `Glo Club Contact: ${data.inquiryType}`,
          message: data.message,
          inquiryType: data.inquiryType,
          userInfo: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          }
        }),
      })

      if (response.ok) {
        alert('🌟 Message sent successfully! Our team will get back to you within 24 hours during business hours (Mon-Fri 8am-10pm EST).')
        reset()
      } else {
        alert('There was an issue sending your message. Please call us directly at (410) 775-8186 for immediate assistance.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Please call us at (410) 775-8186 or email joe@glowopticalstudios.com directly.')
    }
  }

  return (
    <AuthWrapper requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-600 mt-2">Get in touch with the Glo Club team</p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">General Inquiries</CardTitle>
                <CardDescription>For all questions or general inquiries</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold">(410) 775-8186</p>
                <p className="text-sm text-gray-600">Mon-Fri • 8am-10pm EST</p>
                <p className="text-xs text-gray-500">*Excluding holidays</p>
                <p className="text-sm">Or use the Contact Form below</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">HR & Employment</CardTitle>
                <CardDescription>Employment verification & HR matters</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold">(410) 775-9727</p>
                <p className="text-sm text-gray-600">Mon-Fri • 8am-10pm EST</p>
                <p className="text-xs text-gray-500">*Excluding holidays</p>
                <p className="text-sm">Human Resources department</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Media Inquiries</CardTitle>
                <CardDescription>Press or media inquiries</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold">(410) 775-5161</p>
                <p className="text-sm text-gray-600">Mon-Fri • 8am-10pm EST</p>
                <p className="text-xs text-gray-500">*Excluding holidays</p>
                <p className="text-sm">press@glowopticalstudios.com</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Form
              </CardTitle>
              <CardDescription>
                All inquiries are sent to joe@glowopticalstudios.com
              </CardDescription>
              <div className="text-center mt-2">
                <a 
                  href="/dashboard" 
                  className="text-xs text-gray-500 hover:text-blue-600 underline"
                >
                  🔒 Admin Login
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone must be 10 digits"
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <select
                    {...register("inquiryType", { required: "Please select inquiry type" })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership Information</option>
                    <option value="studio">Studio Booking</option>
                    <option value="events">Events & Workshops</option>
                    <option value="hr">HR & Employment</option>
                    <option value="media">Media & Press</option>
                    <option value="technical">Technical Support</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md"
                    placeholder="Please describe your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  )
}
