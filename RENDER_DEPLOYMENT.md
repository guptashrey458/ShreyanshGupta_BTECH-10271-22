# Backend Deployment Guide - Render.com

## 🚀 Why Render for Backend?

- ✅ **Free Tier**: 750 hours/month (enough for development)
- ✅ **Auto-deploy**: Connects to GitHub, deploys on push
- ✅ **Environment Variables**: Easy setup
- ✅ **Logs**: Great debugging experience
- ✅ **Custom Domains**: Free HTTPS

## 📋 Step-by-Step Render Deployment

### **1. Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub account

### **2. Create New Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your repository: `shreyanshgupta-btech1027122`
3. Render will scan your repo

### **3. Configure Service Settings**

**Basic Settings:**
- **Name**: `kanban-backend` (or any name you prefer)
- **Region**: Choose closest to your users
- **Branch**: `master`
- **Root Directory**: `backend` ← **IMPORTANT**

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **4. Environment Variables**
In Render dashboard, add these environment variables:

**Required Variables:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kanban
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=10000
```

**MongoDB Setup:**
- Use MongoDB Atlas (free tier)
- Get connection string from Atlas dashboard
- Replace `<username>`, `<password>`, and `<dbname>`

### **5. Deploy**
1. Click **"Create Web Service"**
2. Render will:
   - Clone your repo
   - Install dependencies
   - Start your server
   - Provide a URL like: `https://kanban-backend.onrender.com`

### **6. Test Your Backend**
Visit: `https://your-app-name.onrender.com/api/health`

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Kanban API is running",
  "database": "Connected",
  "timestamp": "2024-01-14T..."
}
```

## 🔧 Troubleshooting

### **Common Issues:**

**Issue 1: "Service Unavailable"**
- Check **Logs** tab in Render dashboard
- Usually means app crashed on startup
- Check environment variables

**Issue 2: Database Connection Failed**
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Ensure database user has read/write permissions

**Issue 3: Port Issues**
- Render uses `PORT` environment variable
- Your app.js already handles this: `process.env.PORT || 5000`

### **Render Free Tier Limitations:**
- ⚠️ **Spins down after 15 minutes** of inactivity
- ⚠️ **Cold start**: ~30 seconds to wake up
- ✅ **750 hours/month**: Plenty for development
- ✅ **Upgrade to paid**: $7/month for always-on

## 🔗 Connect to Frontend

### **After Backend is Deployed:**

1. **Get Render URL**: `https://your-app-name.onrender.com`

2. **Update Frontend Environment Variable**:
   - In Vercel dashboard
   - Add: `VITE_API_URL=https://your-app-name.onrender.com/api`

3. **Update Backend CORS** (if needed):
   ```javascript
   app.use(cors({
     origin: (origin, callback) => {
       if (!origin) return callback(null, true);
       if (origin.startsWith('http://localhost') || 
           origin.endsWith('.vercel.app') || 
           origin.endsWith('.onrender.com')) {
         return callback(null, true);
       }
       callback(new Error('Not allowed by CORS'));
     },
     credentials: true
   }));
   ```

## 📊 Final Architecture

```
Frontend (Vercel)     Backend (Render)      Database (MongoDB Atlas)
├── React SPA    →    ├── Express API   →   ├── MongoDB Cloud
├── Static Files      ├── JWT Auth          ├── User Data
└── Environment       └── CORS Config       └── Task Data
    VITE_API_URL
```

## 🎯 Deployment Checklist

- [ ] Render account created
- [ ] Web service configured with `backend` root directory
- [ ] Environment variables added (MONGO_URI, JWT_SECRET, NODE_ENV)
- [ ] Service deployed successfully
- [ ] API health check returns 200 OK
- [ ] Frontend VITE_API_URL updated
- [ ] Full-stack app working

**Your backend will be live at: `https://your-app-name.onrender.com` 🚀**