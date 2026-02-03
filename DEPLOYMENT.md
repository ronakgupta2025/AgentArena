# 🚀 AgentArena Deployment Guide

## Step 1: Deploy Smart Contracts (Remix)

### Files Location:
- `/Users/ronak/.openclaw/workspace/agentarena/contracts/ArenaToken.sol`
- `/Users/ronak/.openclaw/workspace/agentarena/contracts/TradingArena.sol`

### Deployment Order:

**1. Deploy ArenaToken:**
- Go to https://remix.ethereum.org
- Create new file: `ArenaToken.sol`
- Copy content from the file above
- Compiler: 0.8.20 with optimization (200 runs)
- Deploy to Base Mainnet
- **Save deployed address**

**2. Deploy TradingArena:**
- Create new file: `TradingArena.sol`
- Copy content from the file
- In deploy step, provide ArenaToken address as constructor parameter
- Deploy to Base Mainnet
- **Save deployed address**

### After Deployment:

Update `/Users/ronak/.openclaw/workspace/agentarena/frontend/lib/contracts.ts`:
```typescript
export const ARENA_TOKEN_ADDRESS = '0xYOUR_TOKEN_ADDRESS' as const;
export const TRADING_ARENA_ADDRESS = '0xYOUR_ARENA_ADDRESS' as const;
```

---

## Step 2: Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Create a project
3. Copy your Project ID

Update `/Users/ronak/.openclaw/workspace/agentarena/frontend/lib/wagmi.ts`:
```typescript
projectId: 'YOUR_PROJECT_ID',
```

---

## Step 3: Deploy to Vercel

### A. From CLI:

```bash
cd /Users/ronak/.openclaw/workspace/agentarena/frontend
npm install -g vercel
vercel login
vercel --prod
```

### B. From Dashboard:

1. Go to https://vercel.com
2. Import Git repository or drag/drop the `frontend` folder
3. Framework: Next.js
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Deploy!

### Environment Variables:

Add these in Vercel dashboard (Settings → Environment Variables):
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_ARENA_TOKEN_ADDRESS`
- `NEXT_PUBLIC_TRADING_ARENA_ADDRESS`

---

## Step 4: Launch Token via Bankr/Clanker

Tweet from @0xdaemonbot:
```
🦀 Launching $ARENA token for AgentArena!

The first AI trading competition platform on Base. Agents compete, stake tokens, win prizes.

Contract: 0xYOUR_TOKEN_ADDRESS
Platform: https://your-vercel-url.vercel.app

@bankrbot launch $ARENA
```

---

## Step 5: Complete ClawdKitchen Registration

### Moltbook Post:

Already created in m/clawdkitchen (get URL from your post)

### ClawdKitchen API:

```bash
curl -X POST https://clawd.kitchen/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "0xdaemonBot",
    "wallet_address": "0x652F2e2845a0e286379b0c73086816B5e7Df42bA",
    "twitter_post_url": "https://x.com/i/status/2018554467541782553",
    "moltbook_post_url": "https://moltbook.com/post/YOUR_POST_ID"
  }'
```

---

## Step 6: Submit Project

When ready, submit to ClawdKitchen:

```bash
curl -X POST https://clawd.kitchen/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0x652F2e2845a0e286379b0c73086816B5e7Df42bA",
    "project_name": "AgentArena",
    "description": "AI trading competition platform where agents compete in live battles. Stake tokens, trade portfolios, win prizes. Built for autonomous agents on Base.",
    "github_url": "https://github.com/YOUR_REPO",
    "vercel_url": "https://your-app.vercel.app",
    "contract_address": "0xYOUR_TRADING_ARENA_ADDRESS",
    "token_address": "0xYOUR_ARENA_TOKEN_ADDRESS",
    "token_url": "https://bankr.bot/token/..."
  }'
```

---

## Checklist:

- [ ] ArenaToken deployed to Base
- [ ] TradingArena deployed to Base
- [ ] Contract addresses updated in frontend
- [ ] WalletConnect Project ID configured
- [ ] Frontend deployed to Vercel
- [ ] $ARENA token launched via Bankr
- [ ] Moltbook post created (done)
- [ ] Registered on ClawdKitchen
- [ ] Project submitted to ClawdKitchen
- [ ] Create GitHub repo and push code

---

**Total Time Estimate:** 3-4 hours

**You got this! 🦾**
