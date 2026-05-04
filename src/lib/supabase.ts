// ─────────────────────────────────────────────────────────────────────────────
//  SUPABASE SHIM — Supabase has been replaced with our own backend.
//  This file keeps the `createClient()` import working across all pages
//  without changing any existing import statements.
// ─────────────────────────────────────────────────────────────────────────────
import { auth, sites, pages, sections, subscription } from './api';

export function createClient() {
  return {
    // ── Auth ──────────────────────────────────────────────────────────────────
    auth: {
      getUser: async () => {
        const { data, error } = await auth.getUser();
        return { data: { user: data?.user ?? null }, error };
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await auth.signIn(email, password);
        return { data, error: error ? { message: error } : null };
      },
      signUp: async ({ email, password, options }: { email: string; password: string; options?: { data?: { full_name?: string } } }) => {
        const { data, error } = await auth.signUp(email, password, options?.data?.full_name || '');
        return { data, error: error ? { message: error } : null };
      },
      signOut: async () => {
        await auth.signOut();
        return { error: null };
      },
      signInWithOAuth: async ({ provider, options }: { provider: string; options?: { redirectTo?: string } }) => {
        // Google OAuth — handled via backend redirect
        if (typeof window !== 'undefined') {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
          window.location.href = `${apiUrl}/auth/google?redirectTo=${options?.redirectTo || '/dashboard'}`;
        }
        return { data: null, error: null };
      },
    },

    // ── Database shim (maps Supabase .from() calls to our API) ────────────────
    from: (table: string) => new TableShim(table),
  };
}

// ── TableShim: translates Supabase query builder calls to our REST API ────────
class TableShim {
  private table: string;
  private _filters: Record<string, any> = {};
  private _order: { column: string; ascending: boolean } | null = null;
  private _single = false;

  constructor(table: string) {
    this.table = table;
  }

  select(_cols?: string) { return this; }
  eq(col: string, val: any) { this._filters[col] = val; return this; }
  order(col: string, opts?: { ascending?: boolean }) {
    this._order = { column: col, ascending: opts?.ascending ?? true };
    return this;
  }
  single() { this._single = true; return this; }

  async then(resolve: (val: any) => any) {
    const result = await this._execute();
    return resolve(result);
  }

  private async _execute(): Promise<{ data: any; error: any }> {
    try {
      switch (this.table) {
        case 'sites': {
          if (this._filters.id) {
            const { data, error } = await sites.get(this._filters.id);
            return { data: data?.site ?? null, error: error ? { message: error } : null };
          }
          if (this._filters.subdomain) {
            const { data, error } = await sites.getPublished(this._filters.subdomain);
            return { data: data?.site ?? null, error: error ? { message: error } : null };
          }
          const { data, error } = await sites.list();
          return { data: data?.sites ?? [], error: error ? { message: error } : null };
        }

        case 'pages': {
          const siteId = this._filters.site_id;
          if (!siteId) return { data: [], error: null };
          const { data, error } = await pages.list(siteId);
          return { data: data?.pages ?? [], error: error ? { message: error } : null };
        }

        case 'sections': {
          const pageId = this._filters.page_id;
          if (!pageId) return { data: [], error: null };
          // siteId not available here — sections endpoint needs it
          // We store siteId in sessionStorage from the builder page
          const siteId = typeof window !== 'undefined'
            ? sessionStorage.getItem('currentSiteId') || ''
            : '';
          const { data, error } = await sections.list(siteId, pageId);
          return { data: data?.sections ?? [], error: error ? { message: error } : null };
        }

        case 'subscriptions': {
          const { data, error } = await subscription.get();
          const sub = data?.subscription ?? null;
          return { data: this._single ? sub : [sub].filter(Boolean), error: error ? { message: error } : null };
        }

        case 'user_profiles': {
          // Profile data comes from /auth/me
          const { data, error } = await auth.getUser();
          const user = data?.user;
          if (!user) return { data: null, error: null };
          const profile = { user_id: user.id, full_name: `${user.firstName} ${user.lastName}`.trim() };
          return { data: this._single ? profile : [profile], error: null };
        }

        default:
          return { data: this._single ? null : [], error: null };
      }
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }

  // Mutation methods
  async insert(payload: any) {
    return { data: payload, error: null };
  }

  update(payload: any) {
    const self = this;
    return {
      eq: (col: string, val: any) => ({
        async then(resolve: (val: any) => any) {
          let result: any = { data: null, error: null };
          try {
            if (self.table === 'sites') {
              const { data, error } = await sites.update(val, payload);
              result = { data: data?.site ?? null, error: error ? { message: error } : null };
            } else if (self.table === 'sections') {
              const { data, error } = await sections.update(val, payload.content);
              result = { data: data?.section ?? null, error: error ? { message: error } : null };
            } else if (self.table === 'user_profiles') {
              result = { data: payload, error: null };
            }
          } catch (err: any) {
            result = { data: null, error: { message: err.message } };
          }
          return resolve(result);
        },
      }),
    };
  }

  delete() {
    const self = this;
    return {
      eq: (col: string, val: any) => ({
        async then(resolve: (val: any) => any) {
          let result: any = { data: null, error: null };
          try {
            if (self.table === 'sites') {
              const { error } = await sites.delete(val);
              result = { data: null, error: error ? { message: error } : null };
            } else if (self.table === 'sections') {
              const { error } = await sections.delete(val);
              result = { data: null, error: error ? { message: error } : null };
            }
          } catch (err: any) {
            result = { data: null, error: { message: err.message } };
          }
          return resolve(result);
        },
      }),
    };
  }
}
