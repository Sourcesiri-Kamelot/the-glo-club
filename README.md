# 🌟 The Glo Club - Premium Creative Community Platform

> **Where creative professionals connect, collaborate, and create extraordinary work.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

## 🚀 Project Overview

The Glo Club is a production-ready, premium creative community platform built for creative professionals. It features studio booking, community networking, events management, AI assistance, and comprehensive member management.

### ✨ Key Features

- **🏠 Professional Landing Page** - Hero section with membership tiers
- **🔐 Admin-Only Access** - Secure authentication system
- **📊 Member Dashboard** - Usage tracking and quick actions
- **📅 Events System** - Calendar with RSVP functionality
- **👥 Community Hub** - Social feed with interactions
- **🏢 Member Directory** - Professional networking
- **⭐ Member Spotlight** - Recognition system
- **📚 Resource Library** - Templates, ebooks, magazine viewer
- **🎬 Studio Booking** - Hour tracking and scheduling
- **🤖 AI Assistant** - Production expert chatbot
- **📞 Contact System** - Multi-department routing
- **📱 Fully Responsive** - Mobile-first design

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Professional component library
- **React Hook Form** - Form validation
- **Tailwind CSS Animate** - Smooth animations

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database management
- **NextAuth.js** - Authentication
- **Nodemailer** - Email integration

### AI & Tools
- **Ollama** - Local AI model (Llama 3.2)
- **Custom Training** - Glo Club knowledge base
- **Git LFS** - Large file storage

## 🏗️ Architecture

```
the-glo-club/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript definitions
├── prisma/                 # Database schema & migrations
├── ollama/                 # AI model configuration
├── scripts/                # Deployment & utility scripts
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git LFS installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/the-glo-club.git
   cd the-glo-club
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit the application**
   ```
   http://localhost:3000
   ```

## 🔐 Admin Access

The application uses admin-only authentication:

- **Email**: `kiwonbowens@helo-im.ai`
- **Password**: `admin123`

Additional admin accounts:
- `admin@glowopticalstudios.com` / `glo2024`
- `manager@glowopticalstudios.com` / `manager123`

## 📧 Email Configuration

Configure SMTP settings in `.env.local`:

```env
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=heloimai@helo-im.ai
EMAIL_PASS=your-password
```

## 🤖 AI Assistant Setup

The AI assistant uses Ollama with Llama 3.2:

1. **Install Ollama**
   ```bash
   # macOS
   brew install ollama
   
   # Start Ollama service
   ollama serve
   ```

2. **Create custom model**
   ```bash
   cd ollama
   ollama create glo-assistant -f Modelfile
   ```

3. **Test the model**
   ```bash
   ollama run glo-assistant
   ```

## 🚀 Deployment

### Vercel (Recommended)
```bash
./scripts/deploy-vercel.sh
```

### Netlify
```bash
./scripts/deploy-netlify.sh
```

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `.next` folder to your hosting provider
3. Configure environment variables
4. Set up database connection

## 📊 Business Model

### Membership Tiers
- **Basic**: $99/month - 2 hours studio access
- **Pro**: $199/month - Unlimited access + events
- **Premium**: $399/month - 24/7 access + consultation

### Revenue Streams
- Monthly memberships
- Premium workshops
- Equipment rental
- Corporate events
- Brand consultations

## 🧪 Testing

Run the automated test suite:
```bash
node scripts/test-functionality.js
```

Manual testing checklist available in `TESTING_CHECKLIST.md`

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - Complete deployment instructions
- **[Project Summary](PROJECT_SUMMARY.md)** - Detailed project overview
- **[Testing Checklist](TESTING_CHECKLIST.md)** - Manual testing guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

- **General**: (410) 775-8186
- **HR**: (410) 775-9727
- **Media**: (410) 775-5161
- **Email**: joe@glowopticalstudios.com
- **Hours**: Mon-Fri • 8am-10pm EST

## 📄 License

This project is proprietary software owned by Glo Optical Studios.

## 🌟 Acknowledgments

- Built with ❤️ for creative professionals
- Powered by Next.js, TypeScript, and Tailwind CSS
- AI assistance by Ollama and Llama 3.2
- Designed for creative prosperity and wealth building

---

**Ready to change the creative industry!** 🚀✨

*For technical support or questions, contact the development team.*
