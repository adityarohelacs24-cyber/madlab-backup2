
# 🧪 Reacto Interactive - Full Stack Chemistry Learning Platform

A **production-ready full-stack web & mobile application** for learning JEE Chemistry with 50+ reactions, interactive test-tube visualizations, user authentication, and progress tracking. Built as a **Progressive Web App (PWA)** with **Capacitor** for native Android deployment.

![React](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-green) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-orange) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B6FF) ![Capacitor](https://img.shields.io/badge/Capacitor-8.4-purple)

---

## ✨ Features

### 🔐 User Authentication
- **Sign Up & Sign In** with email/password
- **Persistent sessions** across browser refreshes
- **Protected routes** — Only authenticated users access the app
- **User profiles** auto-created on registration (stored in `profiles` table)
- **Sign Out** functionality with session cleanup

### 📚 Comprehensive Reaction Database
- **50+ JEE Syllabus Reactions** organized by category:
  - **Salt Analysis (Cations) — 6 Groups, 19 reactions:**
    - Group I: Lead, Silver, Mercurous
    - Group II: Copper, Cadmium, Bismuth, Arsenic
    - Group III: Iron, Aluminium, Chromium
    - Group IV: Zinc, Nickel, Cobalt, Manganese
    - Group V: Calcium, Barium, Strontium
    - Group VI: Ammonium, Magnesium
  - **Salt Analysis (Anions) — 12 reactions:**
    - Carbonate, Bicarbonate, Sulfide, Sulfite, Sulfate, Chloride, Bromide, Iodide, Nitrate, Nitrite, Acetate, Phosphate
  - **Organic Reactions — 23 reactions:**
    - Haloalkanes (SN1, SN2, E1/E2, Wurtz, Sandmeyer)
    - Alcohols (Oxidation, Dehydration, Lucas Test)
    - Aldehydes/Ketones (Tollens, Fehling, Aldol, Cannizzaro, Clemmensen, Wolff-Kishner)
    - Carboxylic Acids (Esterification, Decarboxylation, Kolbe)
    - Amines (Hinsberg, Carbylamine, Hoffmann Bromamide)
    - Aromatic (Friedel-Crafts, Nitration, Sulfonation)

### 🧫 Interactive Visualizations
- **Animated Test-Tube Simulations** — See precipitate formation, color changes, and gas evolution
- **Step-by-Step Reaction Playback** — Click "Run Reaction" to watch each step animate sequentially
- **Visual Color Coding** — Each reaction step shows accurate solution/precipitate colors
- **Confirmatory Test Details** — Expandable accordion panels for observations, equations, and theory

### 💾 Learning Features
- **❤️ Bookmark Reactions** — Save favorites for quick access (dedicated Bookmarks tab)
- **✅ Mark as Completed** — Track learning progress per reaction
- **📊 Progress Dashboard** — View total reactions, completed count, bookmarked count, and completion percentage with animated progress bar
- **🔍 Search & Filter** — Search organic reactions by keyword and filter by category (Haloalkanes, Alcohols, Aldehydes/Ketones, Carboxylic Acids, Amines, Aromatic)
- **🌙 Dark Mode** — Eye-friendly theme toggle with smooth transitions
- **👤 Profile & Settings Modal** — View user details, set daily practice goals (3/5/10/20 reactions per day), toggle appearance
- **💡 JEE Tips Tab** — Exam tips, color memory guides, important equations, common mistakes, practical exam tips, and high-yield topics

### 📱 Mobile App (Capacitor)
- **Native Android App** via Capacitor 8.4
- **WebView-compatible** — Custom state-based dropdowns replace Radix dropdowns for WebView compatibility
- **Progressive Web App (PWA)** — Installable with service worker, offline-capable manifest

### 🗄️ Backend (Supabase)
- **PostgreSQL Database** with optimized tables
- **Row-Level Security (RLS)** for data privacy
- **Real-time Data Sync** across all devices
- **Public Reactions Table** — All users see same reactions
- **Private User Tables** — Each user's progress and profile data is encrypted

### 🎨 Frontend
- **React 18** with **TypeScript** for type safety
- **Tailwind CSS 4.0** for responsive design
- **Radix UI Components** for accessibility (Accordion, Tabs, Dialog, etc.)
- **Lucide React** for icons
- **React Router 7** for navigation
- **Framer Motion** for animations
- **Mobile-first responsive layout** with glassmorphism design

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (free tier available)
- Android Studio (for mobile builds, optional)

### Installation

```bash
# Clone the repository
cd madlab-backup2

# Install dependencies
npm install

# Create .env.local file with Supabase credentials
# (Already created - check .env.local)

# Start development server
npm run dev
```

Visit: `http://localhost:5173`

### First Time Setup

1. **Create Account**
   ```
   Go to /signup → Enter details → Create account
   ```

2. **Seed Reactions** (One-time)
   ```
   Go to /admin → Click "🌱 Seed Now" → Wait for success
   ```

3. **Explore App**
   ```
   Go to / → Browse reactions → Bookmark your favorites
   ```

### Android Build (Capacitor)

```bash
# Build web assets
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

---

## 📁 Project Structure

```
madlab-backup2/
├── src/
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client config
│   │   └── seedReactions.ts         # Load reactions into DB
│   │
│   ├── hooks/
│   │   ├── useReactions.ts          # Fetch reactions from DB
│   │   └── useUserProgress.ts       # Track bookmarks & progress
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx          # Auth provider, state & useAuth hook
│   │
│   ├── app/
│   │   ├── App.tsx                  # Main application (tabs, overview, settings)
│   │   ├── pages/
│   │   │   └── AdminPanel.tsx       # Database seeding UI
│   │   ├── components/
│   │   │   ├── SignUp.tsx           # Registration form
│   │   │   ├── SignIn.tsx           # Login form
│   │   │   ├── ProtectedRoute.tsx   # Route protection
│   │   │   ├── ReactionSeeder.tsx   # Seeding component
│   │   │   ├── ReactionCard.tsx     # Reaction display with test-tube visualization
│   │   │   ├── TestTube.tsx         # Animated test-tube SVG component
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx  # Image component with fallback
│   │   │   └── ui/                  # 48 Radix-based UI components
│   │   │       ├── tabs.tsx         # Tab navigation
│   │   │       ├── card.tsx         # Card container
│   │   │       ├── accordion.tsx    # Expandable panels
│   │   │       ├── badge.tsx        # Status badges
│   │   │       ├── button.tsx       # Button variants
│   │   │       └── ...             # 43 more UI components
│   │   └── data/
│   │       ├── saltAnalysisData.ts  # 19 cation + 12 anion reactions
│   │       └── organicReactions.ts  # 23 organic reactions
│   │
│   ├── main.tsx                     # App entry point & routing
│   └── styles/
│       ├── index.css                # Main stylesheet
│       ├── theme.css                # Theme variables & glassmorphism
│       └── fonts.css                # Typography
│
├── android/                         # Capacitor Android native shell
│   ├── app/                         # Android app module
│   ├── build.gradle                 # Gradle build config
│   └── ...
│
├── public/
│   └── icon.png                     # App icon (192x192 / 512x512)
│
├── .env.local                       # Supabase credentials
├── capacitor.config.json            # Capacitor config (appId: com.reacto.interactive)
├── vite.config.ts                   # Vite + PWA configuration
├── tailwind.config.js               # Tailwind CSS config
└── README.md                        # This file
```

---

## 🔗 Routes

| Route | Purpose | Protected |
|-------|---------|-----------| 
| `/signup` | Create new account | ❌ |
| `/signin` | Login | ❌ |
| `/admin` | Seed database | ✅ |
| `/` | Main app — Browse reactions (tabs: Overview, Groups I–VI, Anions, Organic, Bookmarks, Tips) | ✅ |

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3** — UI framework
- **TypeScript 5** — Type safety
- **Tailwind CSS 4.0** — Styling with `@tailwindcss/vite` plugin
- **Radix UI** — 20+ accessible component primitives
- **Lucide React** — Icon library
- **Framer Motion** — Animation engine
- **React Router 7** — Client-side routing
- **Vite 6.3** — Dev server & bundler
- **vite-plugin-pwa** — Progressive Web App support

### Backend
- **Supabase** — Backend as a Service
- **PostgreSQL** — Database
- **Supabase Auth** — Email/password authentication
- **Row-Level Security** — Data privacy

### Mobile
- **Capacitor 8.4** — Native container for Android
- **Android Studio** — Build & deploy native APK

### Development
- **Node.js** — Runtime
- **npm** — Package manager
- **PostCSS** — CSS processing

---

## 📊 Database Schema

### reactions table
```sql
CREATE TABLE reactions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  group_number INT,
  category TEXT,              -- 'cation', 'anion', 'organic'
  reactants TEXT,
  products JSONB,
  observations JSONB,
  equations TEXT,
  precautions TEXT,
  created_at TIMESTAMPTZ
);
```

### user_progress table
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID,               -- References auth.users
  reaction_id TEXT,
  completed BOOLEAN,
  bookmarked BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### profiles table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,        -- References auth.users
  email TEXT,
  full_name TEXT
);
```

---

## 🎯 Usage Examples

### Fetch All Reactions
```typescript
import { useReactions } from './hooks/useReactions';

function ReactionsList() {
  const { reactions, loading } = useReactions();

  if (loading) return <div>Loading...</div>;

  return reactions.map(r => (
    <div key={r.id}>{r.title}</div>
  ));
}
```

### Bookmark a Reaction
```typescript
import { useUserProgress } from './hooks/useUserProgress';

function ReactionCard({ reactionId }) {
  const { isBookmarked, toggleBookmark } = useUserProgress();

  return (
    <button onClick={() => toggleBookmark(reactionId)}>
      {isBookmarked(reactionId) ? '❤️ Bookmarked' : '🤍 Bookmark'}
    </button>
  );
}
```

### Filter by Category
```typescript
const { getByCategory } = useReactions();

const cations = getByCategory('cation');
const organics = getByCategory('organic');
```

### Search Reactions
```typescript
const { search } = useReactions();

const results = search('copper'); // Searches title, description, reactants
```

---

## 🔐 Security Features

- ✅ **Email/Password Authentication** — Secure credential handling
- ✅ **Row-Level Security (RLS)** — Users can only access their own data
- ✅ **Protected Routes** — Unauthenticated users redirected to login
- ✅ **Encrypted Sessions** — Secure session management via Supabase Auth
- ✅ **Public Reactions** — All users see same reaction data (intended)
- ✅ **Private User Data** — Bookmarks, progress, and profiles are user-private

---

## 📱 App Tabs & Navigation

| Tab | Content |
|-----|---------|
| **Overview** | Learning progress dashboard, quick-access cards for all groups |
| **Group I** | Silver Group — Pb²⁺, Ag⁺, Hg₂²⁺ |
| **Group II** | Copper & Arsenic Group — Cu²⁺, Cd²⁺, Bi³⁺, As³⁺ |
| **Group III** | Iron & Aluminium Group — Fe³⁺, Al³⁺, Cr³⁺ |
| **Group IV** | Zinc Group — Zn²⁺, Ni²⁺, Co²⁺, Mn²⁺ |
| **Group V** | Calcium & Barium Group — Ca²⁺, Ba²⁺, Sr²⁺ |
| **Group VI** | Magnesium & Ammonium — Mg²⁺, NH₄⁺ |
| **Anions** | 12 anion confirmatory tests |
| **Organic** | 23 reactions with search & category filter |
| **Bookmarks** | Saved reactions for quick revision |
| **Tips** | JEE exam tips, color memory, high-yield topics |

---

## 🚀 Building for Production

```bash
# Build optimized bundle
npm run build

# Build output
dist/
├── index.html                    # Entry point
├── assets/
│   ├── index-*.css              # Compiled CSS
│   └── index-*.js               # Compiled JS
├── manifest.webmanifest         # PWA manifest
└── sw.js                        # Service worker
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Reactions not showing" | Run `/admin` → Click 🌱 Seed Now |
| "Can't sign in" | Check Supabase Auth is enabled |
| "Bookmarks not saving" | Verify `user_progress` table exists |
| "Admin page won't load" | Make sure you're logged in first |
| "Build errors" | Run `npm install` then `npm run build` |
| "Android build fails" | Run `npx cap sync android` first |

---

## 🎓 Course Compliance

This project meets all requirements for BMS College Mobile Application Development course:

✅ **UI/UX Design** — Premium React UI with glassmorphism, animations, and dark mode
✅ **Wireframes** — Consistent responsive layout with tab-based navigation
✅ **Authentication** — Full sign up/sign in system with Supabase Auth
✅ **Database** — Supabase PostgreSQL with real data (50+ reactions)
✅ **User Features** — Bookmarks, progress tracking, settings, daily goals
✅ **Security** — RLS policies, encrypted auth, protected routes
✅ **Mobile App** — Native Android via Capacitor + PWA support
✅ **Production Ready** — Fully tested, documented, deployable

---

## 🔄 Technology Roadmap

### Current: Hybrid Web + Android App ✅
- React + TypeScript + Vite
- Supabase backend with full authentication
- Capacitor for native Android
- PWA with service worker
- 50+ reactions with interactive visualizations
- Dark mode, bookmarks, progress tracking

### Future Enhancements
- iOS support via Capacitor
- Quiz/test mode
- Video explanations
- AI-powered recommendations
- Collaborative features
- Advanced analytics
- Offline capability with local storage sync

---

## 📞 Contact & Support

- **College:** BMS College of Engineering
- **Department:** Computer Science & Engineering
- **Year:** 2024–2028

---

## 📄 License

This project is part of BMS College's curriculum and is available for educational purposes.

---

## 🎉 Getting Started

1. **Setup:** `npm install && npm run dev`
2. **Create Account:** Sign up at `/signup`
3. **Seed Data:** Go to `/admin` → Click 🌱
4. **Explore:** Browse 50+ reactions with interactive visualizations!

---

**Built with ❤️ for chemistry learners everywhere! 🧪**