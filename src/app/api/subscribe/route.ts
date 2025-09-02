import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface SubscribeRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipTier: string
}

// Create transporter for custom SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, membershipTier }: SubscribeRequest = await request.json()

    const transporter = createTransporter()

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'joe@glowopticalstudios.com',
      subject: `🌟 New Glo Club Membership Application - ${membershipTier}`,
      text: `
New Membership Application Received!

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Membership Tier: ${membershipTier}

Next Steps:
1. Contact the client within 24 hours
2. Schedule onboarding call
3. Process payment and activate membership
4. Send welcome package

Contact them at: ${phone} or ${email}

---
Glo Club Admin System
${new Date().toLocaleString()}
      `,
    })

    // Send welcome email to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🌟 Welcome Future Star! Your Glo Club Journey Begins Now',
      text: `
Hello ${firstName}!

Welcome to the beginning of innovation and wealth for your brand! 🚀

Thank you for applying to The Glo Club ${membershipTier} membership. You've just taken the first step toward creative prosperity and building lasting wealth through your craft.

WHAT HAPPENS NEXT:
✅ Our team will contact you within 24 hours at ${phone}
✅ We'll schedule your personal onboarding consultation
✅ Complete your membership setup and payment processing
✅ Get immediate access to our premium studios and community

YOUR ${membershipTier.toUpperCase()} MEMBERSHIP INCLUDES:
${membershipTier === 'Basic' ? `
• 2 hours monthly studio access
• Community access and networking
• Monthly magazine and resources
• Basic member support
• Investment: $99/month
` : membershipTier === 'Pro' ? `
• Unlimited studio access
• All events included
• Priority booking
• Resource library access
• Pro member badge and networking
• Investment: $199/month
` : `
• 24/7 studio access
• Personal consultation sessions
• Equipment included
• Custom workshops
• VIP experience and priority support
• Investment: $399/month
`}

CONTACT INFORMATION:
📞 General: (410) 775-8186
📞 HR: (410) 775-9727  
📞 Media: (410) 775-5161
📧 Email: joe@glowopticalstudios.com
🕒 Hours: Mon-Fri • 8am-10pm EST

Your creative empire starts here. We can't wait to welcome you to The Glo Club family and watch your brand flourish!

Best regards,
The Glo Club Team

P.S. Follow us on social media for daily inspiration and member success stories!

---
This is an automated welcome message. Our team will contact you personally within 24 hours.
For immediate questions, call (410) 775-8186 or email joe@glowopticalstudios.com
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription successful! Welcome email sent.',
      membershipTier: membershipTier
    })

  } catch (error) {
    console.error('Subscribe API error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
