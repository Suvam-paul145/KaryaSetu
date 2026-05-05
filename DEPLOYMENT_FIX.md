# Vercel Deployment Troubleshooting Guide

## Issue: 404 NOT_FOUND on Root Path

### Root Cause
The frontend static files from `frontend/dist/` were not being served by Vercel due to incorrect routing configuration in `vercel.json`.

### Solution Applied

1. **Fixed vercel.json Configuration**
   - Simplified routes to properly serve frontend static files
   - Backend continues at `/_/backend/*`
   - All other routes → frontend React app (SPA handling)

2. **How it Now Works**
   ```
   Request to https://karya-setu-k1s5.vercel.app/
   ├─ Route 1: Check if path contains /_/backend/* 
   │  └─ NO → Continue to Route 2
   └─ Route 2: Serve frontend/dist/index.html
      └─ Browser runs React app
   ```

### Deployment Flow

```
User visits https://karya-setu-k1s5.vercel.app/
    ↓
Vercel receives request at root path /
    ↓
Routes check: Does URL contain /_/backend?
    ├─ YES → Route to backend Express server
    └─ NO → Route to frontend/dist/index.html
    ↓
Browser loads React app
    ↓
Frontend auto-detects API at ${window.location.origin}/_/backend/api
    ↓
API calls sent to https://karya-setu-k1s5.vercel.app/_/backend/api/*
```

## Files Modified

1. **vercel.json** - Simplified and corrected routing
   - Removed problematic regex patterns
   - Explicit route for `/_/backend/*` to backend
   - Catch-all route for frontend SPA

2. **.vercelignore** - Excludes unnecessary files from deployment

3. **frontend/src/lib/api.ts** - Auto-detects API URL
   - Prod: `${window.location.origin}/_/backend/api`
   - Dev: `http://localhost:3000/api`

4. **backend/src/server.ts** - Updated CORS
   - Accepts all origins: `"*"`
   - Health check endpoint added

## Testing Steps

1. **Push changes:**
   ```bash
   git add vercel.json .vercelignore
   git commit -m "Fix Vercel deployment routing - resolve 404 error"
   git push origin main
   ```

2. **Vercel auto-deploys** (watch Deployments tab)

3. **Test endpoint:**
   - Frontend: `https://karya-setu-k1s5.vercel.app/`
   - Health Check: `https://karya-setu-k1s5.vercel.app/_/backend/api/health`

4. **Browser console should NOT show API errors**

## Environment Variables Still Needed

Set in Vercel **Settings → Environment Variables**:

```
MONGO_URI = your_mongodb_uri
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
JWT_SECRET = your_jwt_secret
BACKEND_URL = https://karya-setu-k1s5.vercel.app
GOOGLE_CALLBACK_URL = https://karya-setu-k1s5.vercel.app/_/backend/api/auth/google/callback
CLIENT_URL = https://karya-setu-k1s5.vercel.app
```

## If Issues Persist

1. **Check Vercel Logs:**
   - Settings → Build and Deployment → View Details
   - Look for errors in build output

2. **Verify Build Success:**
   - Frontend should show: "✓ built in X.XXs"
   - Backend should show: "Build completed"

3. **Check Network Tab (DevTools):**
   - `https://karya-setu-k1s5.vercel.app/` → Should return 200 (HTML)
   - `https://karya-setu-k1s5.vercel.app/_/backend/api/health` → Should return 200 (JSON)

4. **Common Errors & Fixes:**
   - `Cannot GET /` → Frontend dist files not served (routing issue)
   - `API connection error` → Backend not starting (check logs)
   - `CORS error` → Backend CORS not configured (check server.ts)
