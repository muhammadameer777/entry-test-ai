# PrepAI - AI-Powered Pakistani Entry Test Preparation Platform

> **"Learn Smarter. Practice Better. Ace Your Entry Test."**

PrepAI is a full-stack, production-quality, responsive web platform engineered specifically for Pakistani students preparing for competitive medical and engineering university entrance tests, including:
- **MDCAT** (PMDC / UHS / SZABMU / KMU)
- **ECAT** (UET Lahore & Punjab Engineering Colleges)
- **NET** (National University of Sciences & Technology - NUST Series 1–4)
- **NUMS** (Army Medical College & affiliated institutes)
- **FAST-NU** (Computing, Software Engineering, AI & Data Science)
- **General University Entry Tests** (PIEAS, GIKI, NUTECH, etc.)

---

## 🌟 Core Features & Learning Loop

The platform is designed around the continuous learning loop:
**LEARN → PRACTICE → GET FEEDBACK → UNDERSTAND MISTAKE → RETRY → ADAPT DIFFICULTY → TRACK MASTERY → REVISE → MOCK TEST → ANALYZE → IMPROVE → REPEAT**

1. **Socratic AI Academic Tutor:**
   - Calibrated for Pakistani pre-medical and pre-engineering curricula.
   - Does NOT immediately reveal answers. Guides students step-by-step using 2-stage Socratic hints, formula associations, and distractor breakdowns.
   - Mathematical LaTeX rendering with KaTeX (integrals, vectors, chemical equations, matrices).
2. **AI MCQ Generator:**
   - Generates curriculum-aligned past paper questions with strict **Zod structured validation**.
   - Configurable difficulty (Easy, Medium, Hard, Expert) and question types (Conceptual, Numerical, Application, Reasoning, Mixed).
3. **Adaptive Practice Engine:**
   - Dynamic difficulty calibration from Easy to Expert based on accuracy and speed.
   - Speed Drills with strict 35-second countdowns to train exam pacing.
   - Real Exam Mode hiding hints and instant feedback.
4. **Automated Mistake Notebook:**
   - Catalogues every wrong answer by cognitive trap category: *Concept Misconception*, *Calculation Error*, *Careless Oversight*, *Misreading*, *Guessing*, or *Time Pressure*.
   - Includes **"Explain My Mistake"** and instant one-click **"Retry"** mode.
5. **Authentic Mock Test Engine:**
   - Full exam simulation with official negative marking schemes (e.g. ECAT `-1`, FAST `-0.25`, MDCAT `0`).
   - Countdown timer with 5-minute and 1-minute alerts, auto-submit, and persistent localStorage autosave protection against browser refreshes.
   - Question palette with answered, unanswered, marked-for-review, and current question tracking.
6. **Post-Test AI Diagnostic Report:**
   - Detailed breakdown of score, percentile, subject-wise accuracy, speed pacing analysis, and predicted merit ranking.
7. **Spaced Repetition Flashcards:**
   - 3D interactive flip cards with active recall intervals (*Forgotten 1d*, *Hard 3d*, *Easy 7d*).
8. **High-Yield Student Notes:**
   - Notes manager with AI formatting, trap annotation, and past paper formula summarization.
9. **Gamification & Consistency:**
   - XP rewards for speed and accuracy, level progression (Level 1–10+), study streaks (🔥 with Pakistan timezone tracking), and achievement badges.
10. **Master Admin Dashboard:**
    - Full curriculum governance: manage exams, subjects, chapters, topics, and questions.
    - AI Question Moderation queue with confidence scores, approve/reject workflow, and live LaTeX previews.

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS
- **Design System:** Custom academic blue/indigo color palette, accessible contrast, dark/light theme, mobile bottom navigation
- **Math & Chemistry Rendering:** KaTeX (`$formula$` inline and `$$formula$$` block)
- **Database & ORM:** Prisma ORM with SQLite (zero-setup local development) and seamless PostgreSQL support (Vercel / Supabase / Neon in production)
- **Authentication:** Secure bcrypt password hashing, HTTP-only JWT session cookies, role-based access control (Student, Teacher, Admin, Super Admin)
- **AI Service Abstraction:** Provider interface supporting Google Gemini, OpenAI, and a built-in pedagogical Mock AI provider for offline development
- **Analytics:** Recharts & custom responsive SVG data visualizations
- **Validation:** Zod schemas for all API payloads and structured AI outputs

---

## 🔑 Credentials for Testing & Demo

The database is pre-seeded with rich demo data:

| Role | Email | Password | Details |
|---|---|---|---|
| **Demo Student** | `ali@prepai.pk` | `StudentPassword123!` | Ali Khan (MDCAT Pre-Medical, 12-day streak, 78% accuracy) |
| **Administrator** | `admin@prepai.pk` | `AdminPassword123!` | Master Admin with full curriculum & AI moderation access |

*(Quick one-click login buttons are also available directly on the `/auth/login` screen).*

---

## 💻 Local Setup & Development

1. **Clone and Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   Configure `.env` options:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="prepai-secret-jwt-key-for-pakistan-entry-test-app-2026"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   AI_PROVIDER="mock" # Set to "gemini" or "openai" when API key is provided
   GEMINI_API_KEY=""
   OPENAI_API_KEY=""
   ```

3. **Initialize Database and Seed Data:**
   ```bash
   npx prisma generate
   npx prisma db push
   node scripts/seed.mjs
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying to Production (Vercel + PostgreSQL)

1. Set `DATABASE_URL` to your PostgreSQL database connection string (Neon, Supabase, AWS RDS, etc.).
2. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set your production environment variables (`JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, `GEMINI_API_KEY`).
4. Run `npx prisma db push && node scripts/seed.mjs` on your production database.
5. Deploy to Vercel or any containerized hosting platform.
