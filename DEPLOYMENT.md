# Glo Club - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended for Next.js)
```bash
./scripts/deploy-vercel.sh
```

### Option 2: Netlify
```bash
./scripts/deploy-netlify.sh
```

### Option 3: Manual Deployment
1. Build the project: `npm run build`
2. Upload `.next` folder to your hosting provider
3. Configure environment variables
4. Set up database connection

---

## 📋 Pre-Deployment Checklist

### ✅ Required Environment Variables
Copy from `.env.production` to your hosting platform:

- `DATABASE_URL` - Production database connection
- `AUTH_SECRET` - NextAuth.js secret (generate new for production)
- `NEXTAUTH_URL` - Your production domain
- `SMTP_HOST`, `SMTP_PORT`, `EMAIL_USER`, `EMAIL_PASS` - Email configuration
- `OLLAMA_BASE_URL`, `OLLAMA_MODEL_NAME` - AI chat configuration

### ✅ Database Setup
Choose one:
- **PlanetScale** (MySQL, serverless)
- **Supabase** (PostgreSQL, full-stack)
- **Neon** (PostgreSQL, serverless)
- **Railway** (PostgreSQL/MySQL)

### ✅ Domain Configuration
- Set up custom domain (optional)
- Configure SSL certificate
- Update `NEXTAUTH_URL` to match domain

---

## 🌐 Platform-Specific Instructions

### Vercel Deployment
1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select "the-glo-club" folder as root

2. **Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.production`
   - Generate new `AUTH_SECRET`: `openssl rand -base64 32`

3. **Build Settings**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**: Click "Deploy" button

### Netlify Deployment
1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - New site from Git
   - Select your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `the-glo-club`

3. **Environment Variables**:
   - Site settings → Environment variables
   - Add all variables from `.env.production`

4. **Functions**: Enable Netlify Functions for API routes

---

## 🔧 Post-Deployment Setup

### 1. Database Migration
```bash
# Run Prisma migrations on production database
npx prisma migrate deploy
npx prisma generate
```

### 2. Test Core Functionality
- [ ] Landing page loads
- [ ] Authentication works
- [ ] Protected routes redirect properly
- [ ] Forms submit correctly
- [ ] API endpoints respond
- [ ] Chat widget appears (may need Ollama setup)

### 3. Configure Production Services

#### Email Service
- Verify SMTP settings work in production
- Test contact form submissions
- Check email delivery

#### AI Chat (Choose One)
**Option A: Keep Ollama (requires server)**
- Set up Ollama on production server
- Configure `OLLAMA_BASE_URL` to server endpoint

**Option B: Migrate to Azure OpenAI**
- Set up Azure OpenAI service
- Update API endpoints to use Azure
- Replace Ollama calls with Azure OpenAI calls

### 4. Performance Optimization
- Enable CDN for static assets
- Configure image optimization
- Set up monitoring and analytics

---

## 🔄 Azure Migration Path

### Phase 1: Infrastructure
- **Azure App Service** - Host Next.js application
- **Azure Database** - PostgreSQL or MySQL
- **Azure Storage** - File uploads and static assets

### Phase 2: AI Services
- **Azure OpenAI** - Replace Ollama with GPT-4
- **Azure Functions** - Serverless API endpoints
- **Azure CDN** - Content delivery for resources

### Phase 3: Advanced Features
- **Azure Active Directory** - Enterprise authentication
- **Azure Monitor** - Application insights
- **Azure DevOps** - CI/CD pipeline

---

## 🚨 Security Checklist

- [ ] Generate new `AUTH_SECRET` for production
- [ ] Use HTTPS only (`NEXTAUTH_URL` with https://)
- [ ] Secure database with strong passwords
- [ ] Enable CORS protection
- [ ] Set up rate limiting for API routes
- [ ] Configure CSP headers
- [ ] Regular security updates

---

## 📊 Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking and performance monitoring
- **Uptime Robot** - Site availability monitoring

### Key Metrics to Track
- Page load times
- User registration/login rates
- Feature usage (booking, community, resources)
- API response times
- Error rates

---

## 🆘 Troubleshooting

### Common Issues

**Build Fails**
- Check all dependencies are installed
- Verify TypeScript errors are fixed
- Ensure environment variables are set

**Database Connection Fails**
- Verify `DATABASE_URL` is correct
- Check database server is accessible
- Run `npx prisma migrate deploy`

**Authentication Not Working**
- Verify `AUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches domain
- Ensure HTTPS is enabled

**API Routes 500 Error**
- Check server logs for errors
- Verify environment variables
- Test API endpoints individually

---

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Review hosting platform documentation
3. Contact hosting support if needed

**The Glo Club is ready for the world!** 🌟
