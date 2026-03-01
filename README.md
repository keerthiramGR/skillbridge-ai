# SkillBridge AI

> **Bridging Student Skills with Industry Opportunities using Artificial Intelligence**

SkillBridge AI is a production-grade AI-driven skill intelligence platform that replaces resume-based hiring. Students solve real industry problems, AI evaluates capabilities continuously, and recruiters hire based on verified skills.

---

## 🏗️ Architecture

| Layer | Technology | Deployment |
|-------|-----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript, Tailwind CSS v3, Chart.js | Netlify |
| **Backend** | Python FastAPI, Pydantic | Vercel Serverless |
| **Database** | Supabase PostgreSQL | Supabase Cloud |
| **Auth** | Google OAuth 2.0, JWT, OTP | Built-in |
| **AI Engine** | OpenAI GPT-4 API | Via Backend |

---

## 🚀 Core Features

### AI Innovations
- **Skill DNA Engine** — Analyzes coding behavior, problem-solving, and learning patterns to generate dynamic skill profiles
- **AI Career Twin** — Personalized AI mentor for career guidance, skill recommendations, and growth tracking
- **AI Shadow Interviewer** — Mock interviews evaluating reasoning, communication, and technical thinking
- **Smart Talent Matching** — Maps student skills to recruiter requirements using weighted AI scoring

### Three Portals
- **Student Portal** — Problem marketplace, AI workspace, Skill DNA visualization, Career Twin chat, badges, growth timeline
- **Recruiter Portal** — Upload challenges, manage submissions, AI candidate ranking, skill filtering, hiring recommendations
- **Admin Portal** — Recruiter approvals, user management, problem moderation, platform analytics

### Security
- Google OAuth with role-based access
- Recruiter: Organization verification + access key + OTP
- Admin: Passcode + Two-Factor Authentication
- JWT session management with role-based middleware

---

## 📁 Project Structure

```
skillbridge-ai/
├── frontend/                  # Static frontend (HTML/CSS/JS)
│   ├── index.html             # Role selection landing page
│   ├── login.html             # Multi-step auth flow
│   ├── student/dashboard.html # Student dashboard
│   ├── recruiter/dashboard.html
│   ├── admin/dashboard.html
│   ├── css/styles.css         # Design system
│   ├── js/
│   │   ├── app.js             # Core: theme, session, utilities
│   │   ├── api.js             # HTTP client with JWT
│   │   ├── auth.js            # Auth flow logic
│   │   ├── student.js         # Student dashboard
│   │   ├── recruiter.js       # Recruiter dashboard
│   │   └── admin.js           # Admin dashboard
│   ├── netlify.toml
│   └── _redirects
├── backend/                   # Python FastAPI
│   ├── api/index.py           # Vercel entry point
│   ├── app/
│   │   ├── main.py            # FastAPI app
│   │   ├── config.py          # Environment settings
│   │   ├── database.py        # Supabase client
│   │   ├── auth.py            # JWT, OTP, Google OAuth
│   │   ├── routers/           # API routes
│   │   └── services/          # AI modules
│   ├── requirements.txt
│   └── vercel.json
├── database/
│   └── schema.sql             # Full Supabase schema
├── .env.example
└── README.md
```

---

## 🛠️ Local Development

### Prerequisites
- Python 3.9+
- Node.js (optional, for live-server)
- Supabase account
- Google Cloud Console project (for OAuth)
- OpenAI API key

### 1. Clone & Configure

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 2. Setup Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `database/schema.sql` in the Supabase SQL Editor
3. Copy your project URL and anon key to `.env`

### 3. Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs`

### 4. Run Frontend

```bash
cd frontend
# Use any static file server:
npx live-server --port=3000
# Or Python:
python -m http.server 3000
```

---

## 🌐 Deployment

### Frontend → Netlify

1. Connect your GitHub repo to Netlify
2. Set **Publish directory** to `frontend`
3. Deploy - no build command needed

### Backend → Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `backend/`
3. Run `vercel` and follow prompts
4. Add environment variables in Vercel dashboard (reference `vercel.json` env section)

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs for your production domains
4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in env

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/google` | Google OAuth authentication |
| POST | `/auth/send-otp` | Send OTP for recruiter verification |
| POST | `/auth/verify-otp` | Verify OTP |
| POST | `/auth/verify-role` | Admin passcode + 2FA |
| POST | `/problems/upload` | Upload problem statement |
| GET | `/problems/list` | List problems with filters |
| POST | `/submissions/create` | Submit solution |
| POST | `/skills/analyze` | AI Skill DNA analysis |
| POST | `/interview/evaluate` | AI interview evaluation |
| GET | `/recommendations/get` | AI recommendations |
| GET | `/dashboard/analytics` | Platform analytics |

---

## 🔑 Demo Credentials

For testing without backend connectivity:
- **Student**: Any Google account → direct access
- **Recruiter**: OTP = `123456`
- **Admin**: Passcode = `admin2026`, 2FA = `000000`

---

## 📄 License

MIT License — Built for SkillBridge AI.
