# Prime Presence SaaS - Architecture & User Flows

## 🏗️ SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRIME PRESENCE SaaS                      │
│                     (DIY Website Builder Platform)               │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   USERS/CLIENTS  │
└────────┬─────────┘
         │
         ├─ Browser
         │
         ▼
┌──────────────────────────────────────────────┐
│          NEXT.JS APPLICATION (Frontend)      │
│  ┌──────────────────────────────────────┐   │
│  │  Pages                               │   │
│  │  ├─ /signup          (Create account)    │
│  │  ├─ /login           (Sign in)           │
│  │  ├─ /onboarding      (AI brief)          │
│  │  ├─ /dashboard       (Site management)   │
│  │  ├─ /builder         (Visual editor)     │
│  │  ├─ /account         (Settings)          │
│  │  ├─ /:slug           (Published site)    │
│  │  └─ / [with path split]                  │
│  │                                          │
│  │  Components                              │
│  │  ├─ SectionEditor    (Edit content)      │
│  │  ├─ LivePreview      (Preview)           │
│  │  ├─ SectionList      (Manage sections)   │
│  │  └─ PageNav          (Switch pages)      │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  API Routes (/api)                   │   │
│  │  └─ /api/generate-site               │   │
│  │     └─ Calls OpenAI → Creates site   │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  Auth (Supabase)                     │   │
│  │  ├─ Email/Password Sign Up           │   │
│  │  ├─ Google OAuth                     │   │
│  │  └─ Session Management               │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
         │
         │ HTTP/HTTPS
         │
    ┌────┴────────────────────────────┬────────────────────┐
    │                                 │                    │
    ▼                                 ▼                    ▼
┌────────────────┐    ┌──────────────────────┐    ┌──────────────┐
│  SUPABASE      │    │   OPENAI API         │    │  VERCEL      │
│  Database      │    │   (LLM)              │    │  Hosting     │
│  ┌──────────┐  │    │                      │    │              │
│  │ Postgres │  │    │  Claude 3.5 Sonnet   │    │  Deployment  │
│  └──────────┘  │    │  - Generates         │    │  Edge        │
│                │    │  - Optimizes         │    │  Functions   │
│  Tables:       │    │  - Refines           │    │              │
│  ├─ auth.users │    └──────────────────────┘    └──────────────┘
│  ├─ profiles   │
│  ├─ sites      │
│  ├─ pages      │    Next.js API Routes
│  ├─ sections   │    └─ generate-site
│  └─ subscriptions
│                │
│  Auth:         │
│  ├─ Email      │
│  ├─ Google     │
│  └─ JWT        │
│                │
│  Storage:      │
│  ├─ Vectors    │
│  └─ Files      │
│                │
│  RLS Enabled   │
│  ✓ All tables  │
│  ✓ Per-user    │
└────────────────┘
```

---

## 👤 USER JOURNEY (DIY Path)

```
START
  │
  ▼
┌──────────────┐
│  Homepage    │  → "Choose Your Path" Split Design
└──────┬───────┘
       │ Click "Start Free"
       ▼
┌──────────────┐
│  /signup     │  → Email/Password or Google OAuth
└──────┬───────┘
       │ Create Account
       │ → Trigger auto-creates:
       │   • user_profiles row
       │   • subscription (free plan)
       │
       ▼
┌──────────────┐
│ /onboarding  │  → 7-Step AI Brief
│ Step 1: Business Name
│ Step 2: Industry
│ Step 3: Design Style
│ Step 4: Pages Needed
│ Step 5: Target Audience
│ Step 6: Business Goal
│ Step 7: Colour Preference
└──────┬───────┘
       │ Submit
       ▼
┌──────────────┐
│ /api/        │  → AI Generation
│ generate-site│  • Call OpenAI Claude 3.5
│              │  • Generate site structure
│              │  • Create pages
│              │  • Create sections with content
│              │  • Save to database
│              │  • Returns siteId
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ /dashboard   │  → See Created Site (Draft)
│              │  • Site card shows: name, industry, status
│              │  • Buttons: Edit, Preview (if published), Delete
└──────┬───────┘
       │ Click "Edit"
       ▼
┌──────────────┐
│ /builder/    │  → Visual Website Builder
│ [siteId]     │  
│              │  Left Panel:
│              │  • Page navigation
│              │  • Section list (reorderable)
│              │  
│              │  Center:
│              │  • Section editor
│              │  • Edit text, content
│              │  • Save to database
│              │  
│              │  Right:
│              │  • Live preview
│              │  • Desktop/Mobile toggle
│              │  
│              │  Actions:
│              │  • Reorder sections (drag up/down)
│              │  • Delete sections
│              │  • Edit content
└──────┬───────┘
       │ Click "Publish"
       ▼
┌──────────────┐
│ /builder/    │  → Publish Confirmation
│ [siteId]/    │  • Review site details
│ publish      │  • Assign subdomain
│              │  • Click "Publish Now"
│              │  • Site status: draft → published
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Published!   │  • Site now live at:
│              │    user.primepresence.site
│              │  • View online
│              │  • Share URL
│              │  • Continue editing
└──────────────┘
       │
       ▼
Public site visitors
│
▼
GET /tech-startup  → Load published site
                  → Fetch from DB
                  → Render sections
                  → Display to public
```

---

## 🔄 DATA FLOW

### When User Signs Up
```
User → /signup
  ├─ Email + Password
  └─ Google OAuth
       │
       ▼
  Supabase Auth
  ├─ Create auth.users row
  ├─ Trigger: on_auth_user_created
  │  ├─ Create user_profiles row
  │  └─ Create subscriptions row (free, 14-day trial)
  │
  └─ Return session
       │
       ▼
  Redirect to /onboarding
```

### When User Generates Site
```
User → /onboarding (7 steps)
  │
  └─ Submit
       │
       ▼
  /api/generate-site
  ├─ Extract subdomain from business name
  ├─ Verify unique in DB
  ├─ Call OpenAI:
  │  ├─ Prompt with all 7 inputs
  │  ├─ Get JSON structure
  │  └─ Parse response
  │
  ├─ Create site row
  ├─ For each page:
  │  ├─ Create pages row
  │  └─ For each section:
  │     └─ Create sections row with JSONB content
  │
  └─ Return siteId
       │
       ▼
  Redirect to /dashboard
```

### When User Edits Section
```
Builder → Select section
  │
  ▼
SectionEditor opens
  ├─ Show current content
  ├─ User edits text/images
  │
  └─ User clicks "Save"
       │
       ▼
  POST to Supabase
  ├─ Update sections row
  ├─ Set content JSONB
  ├─ Update updated_at
  │
  └─ Update local state
       │
       ▼
  LivePreview re-renders immediately
  (optimistic update)
```

### When User Publishes
```
Builder → Click "Publish"
  │
  ▼
/builder/:siteId/publish
  ├─ Show confirmation
  ├─ Display subdomain
  │
  └─ User clicks "Publish Now"
       │
       ▼
  PUT to Supabase
  ├─ Update sites row
  ├─ Set status = 'published'
  ├─ Set published_at = now()
  │
  └─ Return confirmation
       │
       ▼
  Site now viewable publicly
  at: user.primepresence.site
```

---

## 📊 DATABASE RELATIONSHIPS

```
auth.users (Supabase Auth)
    │
    │ 1:1
    └─── user_profiles
             │ user_id
             ├─ full_name
             ├─ avatar_url
             │
             │ 1:N (many sites per user)
             └─── sites
                      │ site_id
                      ├─ name
                      ├─ subdomain
                      ├─ industry
                      ├─ style
                      ├─ status (draft/published)
                      ├─ color_preference
                      │
                      │ 1:N (many pages per site)
                      └─── pages
                           │ page_id
                           ├─ slug (home, about, services)
                           ├─ title
                           ├─ order
                           │
                           │ 1:N (many sections per page)
                           └─── sections
                                ├─ type (hero, features, about, etc)
                                ├─ order
                                └─ content (JSONB flexible structure)

             │
             │ 1:1 (one subscription per user)
             └─── subscriptions
                  ├─ plan (free, starter, pro, elite)
                  ├─ status (active, trialing, cancelled)
                  ├─ trial_ends_at
                  ├─ current_period_end
```

---

## 🔐 SECURITY MODEL

### Row Level Security (RLS)
```
user_profiles:
  • User can read own profile
  • User can update own profile

sites:
  • User can view own sites
  • User can create sites (only if auth.uid = user_id)
  • User can update own sites
  • User can delete own sites

pages:
  • User can access pages in their sites
  • User can create pages in their sites
  • User can modify pages in their sites

sections:
  • User can access sections in their pages
  • User can create sections in their pages
  • User can modify sections in their pages

subscriptions:
  • User can view own subscription
  • User can create own subscription
  • User can update own subscription
```

### Authentication
```
All protected routes check:
  1. Auth session exists
  2. User is logged in
  3. Resource belongs to user

Auth flow:
  1. User signs up → JWT created by Supabase
  2. JWT stored in httpOnly cookie
  3. Every request includes cookie
  4. Supabase validates JWT
  5. Middleware enforces auth
```

---

## 📈 SCALABILITY

### Database Indexes
```
sites:
  ├─ PRIMARY KEY: id
  ├─ INDEX: user_id (fast user lookups)
  └─ UNIQUE: subdomain (fast subdomain lookups)

pages:
  ├─ INDEX: site_id (fast page listing)
  └─ UNIQUE: (site_id, slug)

sections:
  ├─ INDEX: page_id (fast section listing)
  └─ INDEX: type (fast section type filtering)

subscriptions:
  ├─ INDEX: user_id (fast subscription lookup)
  └─ UNIQUE: user_id (one per user)
```

### Performance Optimizations
```
Frontend:
  • Lazy load sections
  • Optimize images with Next.js Image component
  • Cache API responses
  • Debounce save operations

Backend:
  • Database connection pooling (Supabase)
  • Indexes for common queries
  • Pagination for large lists
  • CDN for static assets (Vercel)

AI Generation:
  • Async operation (doesn't block UI)
  • Streaming responses from Claude
  • Cache generated content
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

```
Source Code (Git)
       │
       ▼
GitHub Repository
       │
       ├─ Trigger: push to main
       │
       ▼
Vercel CI/CD
├─ Build: npm run build
├─ Test: npm run lint
├─ Deploy: Edge functions
│
└─ Production Deployment
   │
   ├─ Regions: Global CDN
   ├─ Serverless Functions: API routes
   ├─ Edge Middleware: Auth checks
   │
   └─ Live at: primepresence.site
      └─ Subdomains: *.primepresence.site

Database (Supabase)
├─ PostgreSQL (managed)
├─ Auto backups
├─ Point-in-time recovery
└─ Connection pooling
```

---

## 💾 SAMPLE DATA FLOW

### Example: User Creates "Tech Startup" Site

```
1. User visits /signup
   └─ Creates account: email@example.com

2. User visits /onboarding
   ├─ Business Name: "Tech Startup"
   ├─ Industry: "Tech / Startup"
   ├─ Style: "Minimal"
   ├─ Pages: [Home, About, Services]
   ├─ Audience: "Young professionals"
   ├─ Goal: "Generate leads"
   └─ Colours: "Dark & Teal"

3. /api/generate-site is called
   ├─ Subdomain generated: "tech-startup"
   ├─ Site created in DB:
   │  └─ {
   │     id: "uuid1",
   │     user_id: "user123",
   │     name: "Tech Startup",
   │     subdomain: "tech-startup",
   │     industry: "Tech / Startup",
   │     style: "Minimal",
   │     status: "draft"
   │     }
   │
   ├─ Pages created:
   │  ├─ Home (slug: "home")
   │  ├─ About (slug: "about")
   │  └─ Services (slug: "services")
   │
   └─ Sections created for each page:
      ├─ Hero section:
      │  └─ content: {
      │     headline: "Welcome to Tech Startup",
      │     subheadline: "Innovative solutions...",
      │     cta: "Get Started"
      │     }
      │
      ├─ Features section:
      │  └─ content: {
      │     title: "Our Features",
      │     features: [{title: "Feature 1", description: "..."}, ...]
      │     }
      │
      └─ Footer section

4. User visits /dashboard
   └─ Sees site card: "Tech Startup" (Draft)

5. User clicks Edit → /builder/uuid1
   ├─ Loads all sections from DB
   ├─ Shows live preview
   └─ Can edit each section

6. User modifies hero headline
   └─ Saves to DB
      └─ content UPDATED to: {
         headline: "User's new headline",
         ...
         }

7. User clicks Publish
   ├─ Site status changed to "published"
   ├─ published_at set to NOW()
   └─ Site now viewable at: tech-startup.primepresence.site

8. Public visitor goes to tech-startup.primepresence.site
   ├─ Loads site by subdomain
   ├─ Fetches all pages and sections from DB
   ├─ Renders HTML
   └─ Displays published website
```

---

This architecture ensures:
- ✅ Security via RLS and auth middleware
- ✅ Scalability via CDN and database indexes
- ✅ Performance via caching and optimization
- ✅ Maintainability via clean separation of concerns
- ✅ User experience via live preview and instant updates
