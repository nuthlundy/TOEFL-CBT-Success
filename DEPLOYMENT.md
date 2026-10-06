# Vercel Deployment & Operation Guide

This document describes the exact procedure for deploying and maintaining the **TOEFL CBT Success — Interactive Digital Learning System** on Vercel via GitHub continuous integration.

---

## 1. Prerequisites

- A GitHub account with write access to the repository.
- A Vercel account linked to your GitHub account (free Hobby or Pro plan).
- Local Git CLI and Node.js 18+ installed.

---

## 2. Initial Setup: GitHub to Vercel

### Step 1: Push Code to GitHub
Ensure all local changes are verified, committed, and pushed to your remote repository:
```bash
git status
git add .
git commit -m "feat: complete production readiness for Vercel deployment"
git push origin main
```

### Step 2: Import into Vercel
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** $\to$ **Project**.
3. Select your Git provider (GitHub) and search for `toefl-cbt-success` (or your repository name).
4. Click **Import**.

### Step 3: Project Configuration
Vercel automatically detects the Vite configuration:
- **Project Name:** `toefl-cbt-success`
- **Framework Preset:** `Vite`
- **Root Directory:** `./` (leave default)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Environment Variables (Optional)
If you wish to configure public branding variables:
- Add `VITE_APP_NAME` with value `TOEFL CBT Success`
- Add `VITE_APP_VERSION` with value `1.0.0`
*(Note: No secret keys are required for the client application).*

### Step 5: Deploy
Click **Deploy**.
Vercel executes:
1. `npm install`
2. `npm run build`
3. Static asset upload to Vercel's Global Edge Network.

---

## 3. SPA Routing & Refresh Configuration

The repository includes a dedicated `vercel.json` file:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This rewrite ensures that direct deep links (e.g. `/listening`, `/practice-tests`, `/audit`) and browser refreshes never return a `404 Not Found` error, but instead route smoothly through `/index.html`.

---

## 4. Continuous Deployment Workflow

```
[Local Development]
       ↓ git push origin <branch>
[GitHub Pull Request]
       ↓ Vercel Bot triggers
[Preview Deployment (Unique URL)]
       ↓ Manual QA & Test Verification
[Merge into main]
       ↓ Automatic trigger
[Production Deployment (Live Custom Domain / vercel.app)]
```

### Preview Deployments
- Every pull request automatically receives a unique ephemeral preview URL (e.g. `https://toefl-cbt-success-git-feature-your-team.vercel.app`).
- Verify responsive layout, test engine timers, and lesson audio playback on the preview URL before merging.

### Production Deployments
- Pushing or merging into `main` automatically triggers a zero-downtime production deployment.

---

## 5. Rollback Procedure

If a deployment contains an unexpected issue in production:
1. Navigate to your project in the **Vercel Dashboard**.
2. Click on the **Deployments** tab.
3. Locate the previous stable deployment that passed all checks.
4. Click the three dots menu (`...`) on that deployment row $\to$ **Instant Rollback**.
5. Vercel re-routes traffic to the previous build artifact immediately with zero downtime.

---

## 6. Local Production Verification

Before pushing code to GitHub, always test the exact production sequence locally:

```bash
# 1. Fresh dependency install
npm ci

# 2. TypeScript validation
npx tsc --noEmit

# 3. Clean production build
npm run build

# 4. Preview local build server
npm run preview
```

---

## 7. Storage Architecture Note

User progress, bookmarks, error logs, and notes are stored strictly in the user's browser `localStorage` on their local device. No remote database configuration is needed for the core learning and test simulation features.
