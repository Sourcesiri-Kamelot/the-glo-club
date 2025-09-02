import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface EmailRequest {
  to: string
  subject: string
  message: string
  inquiryType: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

// Create transporter for custom SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Route inquiry to appropriate department
const routeInquiry = (inquiryType: string) => {
  switch (inquiryType.toLowerCase()) {
    case 'hr':
    case 'employment':
      return {
        email: 'joe@glowopticalstudios.com',
        phone: '(410) 775-9727',
        department: 'HR & Employment'
      }
    case 'media':
    case 'press':
      return {
        email: 'press@glowopticalstudios.com',
        phone: '(410) 775-5161',
        department: 'Media & Press'
      }
    default:
      return {
        email: 'joe@glowopticalstudios.com',
        phone: '(410) 775-8186',
        department: 'General Inquiries'
      }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, inquiryType, userInfo }: EmailRequest = await request.json()

    // Route to appropriate department
    const routing = routeInquiry(inquiryType)
    
    // Create transporter
    const transporter = createTransporter()

    // Email content
    const emailContent = `
New Glo Club Inquiry - ${routing.department}

From: ${userInfo.firstName} ${userInfo.lastName}
Email: ${userInfo.email}
Phone: ${userInfo.phone}
Inquiry Type: ${inquiryType}

Message:
${message}

---
This inquiry was automatically routed to ${routing.department}
Contact: ${routing.phone} | ${routing.email}
Sent via Glo Club AI Assistant
    `

    // Send to joe@glowopticalstudios.com (main hub)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'joe@glowopticalstudios.com',
      subject: `Glo Club Inquiry: ${subject}`,
      text: emailContent,
    })

    // Send copy to specific department if different
    if (routing.email !== 'joe@glowopticalstudios.com') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: routing.email,
        subject: `Glo Club ${routing.department}: ${subject}`,
        text: emailContent,
      })
    }

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userInfo.email,
      subject: 'Glo Club - We received your inquiry!',
      text: `Hello ${userInfo.firstName}!

Thank you for contacting The Glo Club! We've received your inquiry and it has been routed to our ${routing.department} team.

Your inquiry details:
- Subject: ${subject}
- Inquiry Type: ${inquiryType}
- Routed to: ${routing.department}

We'll get back to you within 24 hours during business hours (Mon-Fri 8am-10pm EST).

For urgent matters, you can also call us at ${routing.phone}.

Best regards,
The Glo Club Team

---
This is an automated confirmation. Please do not reply to this email.
For immediate assistance, contact us at joe@glowopticalstudios.com
`,
    })

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      routing: routing
    })

  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  try {
    // Test email to your address
    const transporter = createTransporter()
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'kiwonbowens@helo-im.ai',
      subject: 'Glo Club Email Integration Test',
      text: `Hello Kiwon!

This is a test email from the Glo Club AI Assistant email integration system.

If you're receiving this, the email system is working correctly! 🎉

The system can now:
- Route inquiries to appropriate departments
- Send confirmations to users
- Handle all Glo Club email communications
- Work with custom SMTP providers

Test completed at: ${new Date().toISOString()}

SMTP Configuration:
- Host: ${process.env.SMTP_HOST}
- Port: ${process.env.SMTP_PORT}
- From: ${process.env.EMAIL_USER}

Best regards,
Glo Club AI Assistant 🤖

---
joe@glowopticalstudios.com
(410) 775-8186
`,
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent to kiwonbowens@helo-im.ai',
      timestamp: new Date().toISOString(),
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        from: process.env.EMAIL_USER
      }
    })

  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json(
      { error: 'Email test failed', details: error },
      { status: 500 }
    )
  }
}
