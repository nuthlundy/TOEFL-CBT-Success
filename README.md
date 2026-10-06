# TOEFL CBT Success — Interactive Digital Learning System

A comprehensive, interactive web learning platform and test-simulation environment built upon the educational curriculum of *Peterson's TOEFL CBT Success* by Bruce Rogers.

## Overview

This application transforms the physical textbook into an engaging digital learning system while preserving the author's original educational structure, question types, answer keys, explanations, tapescripts, and scoring methodologies:

- **Primary Source Authority:** *Peterson's TOEFL CBT Success*
- **Author:** Bruce Rogers (Economics Institute, Boulder, Colorado)
- **Publisher:** Thomson Learning / Peterson's (2002 Edition)

The system features:
- **All 48 Book Lessons** (Listening Comprehension, Structure, Written Expression, and Reading Comprehension).
- **37 Mini-Lessons** covering 300+ idiomatic expressions, prepositions, and vocabulary-building items.
- **8 Interactive Mini-Tests** with countdown timers, review palettes, and explanations.
- **3 Full-Length Practice Tests** with authentic ETS raw-to-scaled score conversion equating tables ($0–300$ CBT range).
- **Interactive TWE (Test of Written English) Workspace** with 30-minute timed essay drafting, ETS 6-level rubric analysis, and model essays.
- **Diagnostic Progress & Mistake Review Engine** allowing learners to filter errors by section and skill.
- **Audio-Ready Listening Player** with verbatim speaker tapescripts and Web Speech synthesis fallback (`AUDIO_SOURCE_REQUIRED` standard).
- **Persistent Local Progress** (completed lessons, attempts, bookmarks, notes) stored securely on the user's local device.

---

## Technology Stack

- **Framework:** React 19 (TypeScript)
- **Bundler & Dev Server:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans, Source Serif 4, JetBrains Mono
- **Deployment Platform:** Vercel (SPA with zero-configuration static output)

---

## Local Development

Ensure Node.js 18+ or 20+ is installed on your workstation.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/toefl-cbt-success.git
cd toefl-cbt-success

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To compile and bundle the application for production:

```bash
# Type check without emitting files
npx tsc --noEmit

# Compile production bundle to /dist
npm run build
```

---

## Local Preview of Production Build

To preview the built production bundle locally:

```bash
npm run preview
```

---

## Environment Variables

All core learning material, questions, and conversion tables are bundled as client-safe static modules. No server secrets or proprietary keys are required for the client application.

Refer to `.env.example` for optional public environment configuration:

```env
# Public application configuration (exposed to browser)
VITE_APP_NAME="TOEFL CBT Success"
VITE_APP_VERSION="1.0.0"
```

> **Security Rule:** Never prefix secret API keys or private tokens with `VITE_*` as all `VITE_*` variables are bundled into client-side JavaScript.

---

## Deployment (GitHub → Vercel)

This repository is optimized for continuous deployment on [Vercel](https://vercel.com):

1. Push your repository branch to GitHub.
2. In the Vercel Dashboard, select **Add New Project** and import your GitHub repository.
3. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Deploy. Vercel automatically rebuilds and deploys previews for every pull request and updates production on merges to `main`.
5. The included `vercel.json` ensures that all direct routes and page refreshes route cleanly to `/index.html` without 404 errors.

For detailed steps and rollback procedures, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Important Historical Notice

This application digitizes historical TOEFL CBT (Computer-Based Test) preparation material. 
Current TOEFL testing formats (such as the Internet-Based TOEFL iBT), scoring scales ($0–120$ iBT vs. $0–300$ CBT / $200–670$ PBT), testing interfaces, and ETS policies may differ significantly from historical computer-based administrations.

---

## Content Rights & Disclaimer

- TOEFL is a registered trademark of Educational Testing Service (ETS).
- This application is **not** endorsed by, approved by, or affiliated with ETS.
- The educational content is derived from *Peterson's TOEFL CBT Success* (Bruce Rogers, Thomson Learning). Redistribution, commercial use, or public deployment of copyrighted learning material requires appropriate licensing and authorization from the respective copyright holders.
