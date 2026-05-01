export type SiteStatus = 'draft' | 'published';
export type PlanType = 'free' | 'starter' | 'pro' | 'elite';

export type Site = {
  id: string;
  user_id: string;
  name: string;
  subdomain: string;
  industry: string;
  style: string;
  status: SiteStatus;
  published_at: string | null;
  created_at: string;
  pages?: Page[];
};

export type Page = {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  order: number;
  sections?: Section[];
};

export type SectionType =
  | 'hero'
  | 'features'
  | 'about'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'footer';

export type Section = {
  id: string;
  page_id: string;
  type: SectionType;
  order: number;
  content: Record<string, unknown>;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: PlanType;
  status: 'active' | 'cancelled' | 'trialing';
  current_period_end: string | null;
};

export type OnboardingData = {
  businessName: string;
  industry: string;
  style: string;
  pages: string[];
  audience: string;
  goal: string;
  colorPreference: string;
};
