export type SiteStatus = 'draft' | 'published';
export type PlanType = 'free' | 'starter' | 'pro' | 'elite';

export interface Site {
  id: string;
  _id?: string;
  userId: string;
  name: string;
  subdomain: string;
  industry: string;
  style: string;
  colorPreference: string;
  status: SiteStatus;
  publishedAt: string | null;
  createdAt: string;
  // alias kept for dashboard compatibility
  created_at?: string;
}

export interface Page {
  id: string;
  _id?: string;
  siteId: string;
  slug: string;
  title: string;
  order: number;
}

export type SectionType =
  | 'hero'
  | 'features'
  | 'about'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'footer';

export interface Section {
  id: string;
  _id?: string;
  pageId: string;
  type: SectionType;
  order: number;
  content: Record<string, any>;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  status: 'active' | 'cancelled' | 'trialing';
  currentPeriodEnd: string | null;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface OnboardingData {
  businessName: string;
  industry: string;
  style: string;
  pages: string[];
  audience: string;
  goal: string;
  colorPreference: string;
}
