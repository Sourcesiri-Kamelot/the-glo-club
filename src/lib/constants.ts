// Contact Information for Glow Optical Studios / The Glo Club
export const CONTACT_INFO = {
  // Main contact email - receives all inquiries
  MAIN_EMAIL: process.env.MAIN_EMAIL || "joe@glowopticalstudios.com",
  
  // General Inquiries
  GENERAL: {
    PHONE: process.env.GENERAL_PHONE || "(410) 775-8186",
    HOURS: "7 days a week • 9am-10pm *Excluding holidays",
    EMAIL: process.env.MAIN_EMAIL || "joe@glowopticalstudios.com"
  },
  
  // HR and Employment Verification
  HR: {
    PHONE: process.env.HR_PHONE || "(410) 775-9727", 
    HOURS: "7 days a week • 9am-10pm *Excluding holidays"
  },
  
  // Media and Press Inquiries
  MEDIA: {
    EMAIL: process.env.MEDIA_EMAIL || "press@glowopticalstudios.com",
    PHONE: process.env.MEDIA_PHONE || "(410) 775-5161",
    HOURS: "7 days a week • 9am-10pm *Excluding holidays"
  }
} as const
