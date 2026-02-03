# 🚀 Vercel Deployment Guide - UPDATED

## Issue Fixed:
- Root directory mismatch (frontend is in subdirectory)
- SSR localStorage error with RainbowKit
- Peer dependency conflicts

## ✅ Correct Vercel Settings:

### In Vercel Dashboard → Project Settings:

**General Settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `frontend` ← **CRITICAL!**
- **Build Command:** `npm install --legacy-peer-deps && npm run build`
- **Output Directory:** Leave blank (Next.js default `.next`)
- **Install Command:** `npm install --legacy-peer-deps`

**Environment Variables:**
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=0000000000000000000000000000000
NEXT_PUBLIC_ARENA_TOKEN_ADDRESS=0x2E94A72e7b97d7527192E238A7d4e50F9FAA37e0
NEXT_PUBLIC_TRADING_ARENA_ADDRESS=0x7B2a734CccB50835b3B7F11B369C105d6CCfA079
```

## 🔧 How to Fix Current Deployment:

### Option 1: Update Settings in Vercel Dashboard

1. Go to your project in Vercel
2. **Settings** → **General**
3. Scroll to **Root Directory**
4. Change from `.` to `frontend`
5. Save
6. Go to **Deployments** → Click ⋯ → **Redeploy**

### Option 2: Delete and Reimport

1. Delete current Vercel project
2. Import again from GitHub
3. When configuring:
   - Select `frontend` as Root Directory
   - Set environment variables
   - Deploy

### Option 3: Deploy via CLI (Recommended - Fastest)

```bash
cd /Users/ronak/.openclaw/workspace/agentarena/frontend
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (create new) or **Y** (if you want to overwrite)
- Project name? **agentarena**
- Directory? **.** (we're already in frontend/)
- Override settings? **N**

---

## 📋 Checklist:

- [ ] Push latest code to GitHub
- [ ] Set Root Directory to `frontend` in Vercel
- [ ] Add environment variables
- [ ] Redeploy
- [ ] Verify deployment works

---

## 🐛 If You Still See Errors:

**For localStorage errors:**
These are warnings from RainbowKit SSR. The app should still work - these are client-side only features.

**For 404 errors:**
Make sure Root Directory is set to `frontend` in Vercel settings.

**For build errors:**
Check that Build Command includes `--legacy-peer-deps` flag.

---

**Once deployed successfully, you'll get a URL like: `https://agentarena.vercel.app`** 🎉
