# Vercel Deployment Fix

## Issue:
Peer dependency conflict between wagmi v3 and @rainbow-me/rainbowkit v2

## Solution Applied:

### 1. Downgraded wagmi to v2.19.5
Changed in `frontend/package.json`:
```json
"wagmi": "^2.19.5"  // was "^3.4.2"
```

### 2. Added .npmrc for legacy peer deps
Created `frontend/.npmrc`:
```
legacy-peer-deps=true
```

This ensures npm will install even with peer dependency warnings.

## Vercel Deployment Steps:

### Option A: Redeploy (Recommended)

1. Push the updated code:
```bash
cd /Users/ronak/.openclaw/workspace/agentarena
git add -A
git commit -m "Fix wagmi version for Vercel deployment"
git push
```

2. Vercel will auto-redeploy with the fixed dependencies

### Option B: Manual Build Test

Test locally first:
```bash
cd frontend
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

If successful, push and redeploy.

## Environment Variables for Vercel:

Make sure these are set in Vercel dashboard:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=get_from_cloud.walletconnect.com
NEXT_PUBLIC_ARENA_TOKEN_ADDRESS=0xBc0Ee7ADF4347d21FdEc9F785955a40106BE2B07
NEXT_PUBLIC_TRADING_ARENA_ADDRESS=0xd95E4C2190C6b2574937a094b9EDB41Cbed338Da
```

## If Still Failing:

Add build command override in Vercel:
```
cd frontend && npm install --legacy-peer-deps && npm run build
```

---

**This should fix the Vercel deployment! 🚀**
