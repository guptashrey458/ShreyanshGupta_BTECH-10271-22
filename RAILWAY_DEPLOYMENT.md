# Backend Deployment Guide - Railway

## Why Railway for Backend?

Your Express.js backend with MongoDB is perfect for Railway because:
- ✅ Persistent server (not serverless)
- ✅ Database connections work properly
- ✅ Middleware and complex routing supported
- ✅ Environment variables handled correctly

## Step 1: Prepare Backend for Railway

### 1.1 Update backend/src/app.js (if needed)
Make sure your app listens on the correct port:

```javascript
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

### 1.2 Create railway.json (optional)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Step 2: Deploy to Railway

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your repository

### 2.2 Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will auto-detect Node.js

### 2.3 Configure Environment Variables
In Railway dashboard, add:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret
- `NODE_ENV=production`
- `PORT=5000` (Railway will override this)

### 2.4 Set Root Directory
In Railway settings:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## Step 3: Update Frontend Configuration

### 3.1 Get Railway URL
After deployment, Railway gives you a URL like:
`https://your-app-name.railway.app`

### 3.2 Update Vercel Environment Variables
In Vercel dashboard, add:
- `VITE_API_URL=https://your-app-name.railway.app/api`

### 3.3 Update CORS in Backend
Make sure your backend allows your Vercel domain:

```javascript
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost') || 
        origin.endsWith('.vercel.app') || 
        origin.endsWith('.railway.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
```

## Step 4: Test Full Stack

1. **Frontend**: Deploy to Vercel (frontend-only)
2. **Backend**: Running on Railway
3. **Database**: MongoDB Atlas (recommended)

### Test URLs:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.railway.app/api/health`

## Alternative: Render.com

If you prefer Render:
1. Same process but use render.com
2. Connect GitHub repo
3. Choose "Web Service"
4. Set build/start commands
5. Add environment variables

## Cost Comparison

**Railway**: 
- Free tier: $5 credit/month
- Pay per usage after that

**Render**:
- Free tier: 750 hours/month
- Spins down after inactivity

**Recommendation**: Start with Railway for better performance.