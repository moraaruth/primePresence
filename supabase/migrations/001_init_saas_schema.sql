-- Create user_profiles table (supplement to auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subdomain TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  style TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  color_preference TEXT DEFAULT 'dark-gold',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(site_id, slug)
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('hero', 'features', 'about', 'testimonials', 'cta', 'contact', 'footer', 'gallery', 'team', 'pricing', 'faq')),
  "order" INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'elite')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'trialing')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sites_user_id ON sites(user_id);
CREATE INDEX IF NOT EXISTS idx_pages_site_id ON pages(site_id);
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_type ON sections(type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "users_can_read_own_profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for sites
CREATE POLICY "users_can_list_own_sites" ON sites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_create_sites" ON sites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_sites" ON sites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_sites" ON sites
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for pages
CREATE POLICY "users_can_read_own_pages" ON pages
  FOR SELECT USING (
    site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id)
  );

CREATE POLICY "users_can_create_pages" ON pages
  FOR INSERT WITH CHECK (
    site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id)
  );

CREATE POLICY "users_can_update_pages" ON pages
  FOR UPDATE USING (
    site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id)
  );

CREATE POLICY "users_can_delete_pages" ON pages
  FOR DELETE USING (
    site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id)
  );

-- RLS Policies for sections
CREATE POLICY "users_can_read_own_sections" ON sections
  FOR SELECT USING (
    page_id IN (SELECT id FROM pages WHERE site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id))
  );

CREATE POLICY "users_can_create_sections" ON sections
  FOR INSERT WITH CHECK (
    page_id IN (SELECT id FROM pages WHERE site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id))
  );

CREATE POLICY "users_can_update_sections" ON sections
  FOR UPDATE USING (
    page_id IN (SELECT id FROM pages WHERE site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id))
  );

CREATE POLICY "users_can_delete_sections" ON sections
  FOR DELETE USING (
    page_id IN (SELECT id FROM pages WHERE site_id IN (SELECT id FROM sites WHERE auth.uid() = user_id))
  );

-- RLS Policies for subscriptions
CREATE POLICY "users_can_read_own_subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_create_subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_subscription" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger to auto-create user_profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscriptions (user_id, plan, status, trial_ends_at)
  VALUES (new.id, 'free', 'active', NOW() + INTERVAL '14 days');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
