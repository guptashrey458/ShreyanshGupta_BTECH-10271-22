# Frontend Deployment Guide - Vercel

## 🚀 Complete Full-Stack Deployment

**Architecture:**
- ✅ **Backend**: Render.com (https://shreyanshgupta-btech1027122.onrender.com)
- 🔄 **Frontend**: Vercel (React SPA)
- ✅ **Database**: MongoDB Atlas

## 📋 Step-by-Step Vercel Deployment

### **1. Vercel Account Setup**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### **2. Import Project**
1. Click **"New Project"**
2. Import from GitHub: `shreyanshgupta-btech1027122`
3. Vercel will detect it's a React app

### **3. Configure Build Settings**

**Framework Preset:** `Other` (or `Vite` if available)

**Build & Development Settings:**
- **Build Command**: `cd frontend && npm install && ./node_modules/.bin/vite build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install` (leave default)

### **4. Environment Variables**
In Vercel dashboard, add these environment variables:

**Required Variables:**
```
VITE_API_URL=https://shreyanshgupta-btech1027122.onrender.com/api
```

**How to add:**
1. Go to Project Settings → Environment Variables
2. Add `VITE_API_URL` with the Render backend URL
3. Apply to: **Production**, **Preview**, and **Development**

### **5. Deploy**
1. Click **"Deploy"**
2. Vercel will:
   - Clone your repo
   - Install dependencies
   - Build the React app
   - Deploy to CDN
   - Provide a URL like: `https://your-app.vercel.app`

### **6. Test Your Full-Stack App**

**Frontend URL:** `https://your-app.vercel.app`

**Test Checklist:**
- [ ] Landing page loads ✅
- [ ] Navigate to `/login` works ✅
- [ ] Register new account works ✅
- [ ] Login with account works ✅
- [ ] Dashboard/Board loads ✅
- [ ] Create new task works ✅
- [ ] Drag & drop tasks works ✅

## 🔧 Troubleshooting

### **Common Issues:**

**Issue 1: "Failed to fetch" errors**
- Check `VITE_API_URL` is set correctly
- Verify backend is running: `https://shreyanshgupta-btech1027122.onrender.com/api/health`
- Check browser console for CORS errors

**Issue 2: 404 on page refresh**
- ✅ Already fixed with `vercel.json` rewrites
- SPA routing should work correctly

**Issue 3: Build fails**
- Check build logs in Vercel dashboard
- Verify `frontend/dist` directory is created
- Ensure all dependencies are in `package.json`

**Issue 4: Environment variables not working**
- Ensure `VITE_API_URL` is set in Vercel dashboard
- Redeploy after adding environment variables
- Check it starts with `VITE_` (required for Vite)

### **Backend Connection Issues:**
If API calls fail, check:
1. **Backend Status**: Visit `https://shreyanshgupta-btech1027122.onrender.com/api/health`
2. **CORS Settings**: Backend allows Vercel domain
3. **Environment Variable**: `VITE_API_URL` is correct

## 🎯 Final Architecture

```
Frontend (Vercel)                    Backend (Render)
├── React SPA                   →    ├── Express API
├── Static Files                     ├── JWT Auth
├── Environment Variables            ├── MongoDB Connection
└── SPA Routing                      └── CORS Configuration
    VITE_API_URL ────────────────────────→ /api/*
```

## ✅ Deployment Checklist

**Backend (Already Done):**
- [x] Render deployment successful
- [x] MongoDB connected
- [x] API endpoints working
- [x] Health check returns 200 OK

**Frontend (To Do):**
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] Environment variable `VITE_API_URL` added
- [ ] Deployment successful
- [ ] SPA routing works (refresh on any route)
- [ ] API calls connect to backend
- [ ] Full authentication flow works

## 🚀 Go Live!

**Your app will be live at:**
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://shreyanshgupta-btech1027122.onrender.com`

**Complete full-stack Kanban application ready for production!** 🎉

## 🔄 Future Updates

**To update your app:**
1. **Code Changes**: Push to GitHub
2. **Frontend**: Vercel auto-deploys from GitHub
3. **Backend**: Render auto-deploys from GitHub
4. **Database**: MongoDB Atlas (persistent)

**Both frontend and backend will auto-deploy on every push to master!**