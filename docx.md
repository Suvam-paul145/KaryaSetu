# KaryaSetu Deployment Guide (Frontend + Backend)

This guide is tailored to your current repo structure and code. It shows how to deploy the frontend and backend safely, with environment variables and production-ready configuration.

---

## 1) Quick Overview

- **Frontend**: React + Vite (static build in `frontend/dist`)
- **Backend**: Node.js + Express + TypeScript (builds to `backend/dist`)
- **Database**: MongoDB (Mongoose)
- **Auth**: Google OAuth + JWT

> ✅ You can deploy **frontend only** for the UI demo (mock data).  
> ✅ Deploy **backend** if you want Google login and real API endpoints later.

---

## 2) Environment Variables

### Recommended Variables (used by current code)

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_URL` | Frontend | API base URL (example: `https://your-backend.com/api`) |
| `PORT` | Backend | Server port (usually set by hosting platform) |
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret for JWT signing |
| `GOOGLE_CLIENT_ID` | Backend | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Backend | Google OAuth client secret |
| `CLIENT_URL` | Backend | Frontend URL used for CORS + redirect |
| `BACKEND_URL` | Backend | Base backend URL (used for OAuth callback) |
| `GOOGLE_CALLBACK_URL` | Backend | Full OAuth callback URL (optional override) |

> ✅ A root `.env` file has been created for you with placeholders. You can copy values into:
> - `backend/.env` (backend)
> - `frontend/.env` (frontend)
> Or set them directly in your hosting provider’s environment variables.

---

## 3) Google OAuth Setup (Required if using Google Login)

When you create OAuth credentials in Google Cloud Console, add:

- **Authorized JavaScript Origins**:  
  `CLIENT_URL` (example: `https://your-frontend.com`)

- **Authorized Redirect URIs**:  
  `${BACKEND_URL}/api/auth/google/callback`

Also ensure your backend has these env values:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLIENT_URL`
- `BACKEND_URL`

---

## 4) Deploy Backend (Node.js + Express)

### Build Commands

- **Install**: `npm install`
- **Build**: `npm run build`
- **Start**: `npm start`

### Hosting Settings (General)

- **Root directory**: `backend`
- **Build output**: `backend/dist`
- **Start command**: `npm start`
- **Environment variables**: set all backend variables from section 2

### Smoke Test

Once deployed, test:

- `GET /api/test` should return `{ message: "Backend server is working!" }`

---

## 5) Deploy Frontend (Vite Static Build)

### Build Commands

- **Install**: `npm install`
- **Build**: `npm run build`
- **Output**: `frontend/dist`

### Required Environment Variable

Set this at **build time**:

- `VITE_API_URL=https://your-backend.com/api`

### SPA Routing (Important)

Your frontend uses React Router, so ensure your hosting platform:

- Serves `index.html` for all routes (SPA fallback)

---

## 6) Final Deployment Checklist

✅ Backend deployed and reachable  
✅ Frontend deployed and can load  
✅ `CLIENT_URL` and `BACKEND_URL` match production URLs  
✅ Google OAuth redirect URIs updated  
✅ `VITE_API_URL` points to live backend  
✅ MongoDB accessible from hosting environment  

---

## 7) Notes About Current Code

- The frontend currently uses **mock data** (see `frontend/src/lib/mockData.ts`).
- The backend currently implements **Google OAuth** and a **/api/test** route only.
- If you want full task CRUD, chat, and settings in production, backend routes/controllers will need to be added.

---

## 8) Security Reminders

- Never commit `.env` files or service account JSON files to git.
- The file `karyasetu-2376c-firebase-adminsdk-fbsvc-74fb03d363.json` is already ignored in `.gitignore` — keep it that way.
- Store secrets in your hosting provider’s **Environment Variables** settings.

---

## 9) Optional: One-Server Deployment (Single VPS)

If you want both frontend + backend on one server:

1. Build frontend and backend locally (or on server).
2. Serve frontend `dist/` via Nginx (or any static server).
3. Run backend with Node.js using PM2 or systemd.
4. Point `VITE_API_URL` to the backend’s public URL.

---

If you want, I can also add full backend CRUD routes to match the frontend and make everything production-ready end-to-end.