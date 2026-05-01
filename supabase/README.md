# Supabase Migrations

This directory contains SQL migrations for setting up the Prime Presence SaaS database schema.

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to https://app.supabase.com
2. Select your Prime Presence project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the entire content of `001_init_saas_schema.sql`
6. Paste it into the SQL editor
7. Click **Run**

### Option 2: Supabase CLI
```bash
npm install -g supabase
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## What Gets Created

### Tables
- `user_profiles` - User info supplement
- `sites` - Website projects
- `pages` - Pages within sites
- `sections` - Content sections within pages
- `subscriptions` - User subscription plans

### Security
- Row Level Security (RLS) enabled on all tables
- Policies restrict users to their own data
- Auto-create profile + free tier subscription on signup

### Triggers
- Auto-creates user profile when new auth user is created
- Auto-creates free subscription with 14-day trial

## Testing the Schema
After running the migration, test with a sample query:
```sql
SELECT * FROM user_profiles LIMIT 1;
SELECT * FROM subscriptions LIMIT 1;
```

## Schema Diagram
```
auth.users
    ↓
user_profiles (1:1)
    ↓
sites (1:N)
    ├─ pages (1:N)
    │   └─ sections (1:N)
    │
subscriptions (1:1)
```
