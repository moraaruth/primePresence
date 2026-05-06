// ─────────────────────────────────────────────────────────────────────────────
//  API CLIENT
//  • All requests go directly to Express + MongoDB backend
//  • JWT stored in localStorage, sent as Authorization: Bearer <token>
//  • Never calls Supabase, Firebase, or any Next.js proxy route
// ─────────────────────────────────────────────────────────────────────────────

const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

// ── Normalize MongoDB _id → id (recursively) ─────────────────────────────────
function normalizeIds(obj: any): void {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach(normalizeIds); return; }
  if (obj._id !== undefined) obj.id = String(obj._id);
  Object.values(obj).forEach(normalizeIds);
}

// ── Token helpers ─────────────────────────────────────────────────────────────
export const token = {
  get: (): string | null =>
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  set: (t: string) => localStorage.setItem('accessToken', t),
  clear: () => localStorage.removeItem('accessToken'),
};

// ── Core fetch ────────────────────────────────────────────────────────────────
async function request<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  if (!path) return { data: null, error: 'No path provided' };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const t = token.get();
  if (t) headers['Authorization'] = `Bearer ${t}`;

  try {
    let res = await fetch(`${BASE}${path}`, { ...options, headers });

    // Auto-refresh on 401
    if (res.status === 401 && path !== '/auth/login' && path !== '/auth/refresh') {
      const refreshRes = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (refreshRes.ok) {
        const refreshJson = await refreshRes.json();
        const newToken = refreshJson?.data?.accessToken;
        if (newToken) {
          token.set(newToken);
          headers['Authorization'] = `Bearer ${newToken}`;
          res = await fetch(`${BASE}${path}`, { ...options, headers });
        }
      } else {
        token.clear();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return { data: null, error: 'Session expired. Please log in again.' };
      }
    }

    const json = await res.json();
    normalizeIds(json);

    if (!res.ok) {
      const msg = json?.message || `Request failed with status ${res.status}`;
      console.error(`[API] ${options.method || 'GET'} ${path} → ${res.status}: ${msg}`);
      return { data: null, error: msg };
    }

    return { data: (json?.data ?? json) as T, error: null };
  } catch (err: any) {
    const msg = err?.message || 'Network error — is the backend running?';
    console.error(`[API] ${path} threw:`, msg);
    return { data: null, error: msg };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────────────────────
export const auth = {
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    const { data, error } = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (data?.accessToken) token.set(data.accessToken);
    return { data, error };
  },

  login: async (email: string, password: string) => {
    const { data, error } = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data?.accessToken) token.set(data.accessToken);
    return { data, error };
  },

  logout: async () => {
    await request('/auth/logout', { method: 'POST' });
    token.clear();
  },

  me: async () => request('/auth/me'),
};

// ─────────────────────────────────────────────────────────────────────────────
//  SITES
// ─────────────────────────────────────────────────────────────────────────────
export const sites = {
  list: () => request('/sites'),

  get: (id: string) => {
    if (!id || id === 'undefined') {
      console.error('[API] sites.get called with invalid id:', id);
      return Promise.resolve({ data: null, error: 'Invalid site ID' });
    }
    return request(`/sites/${id}`);
  },

  generate: (payload: object) =>
    request('/sites/generate', { method: 'POST', body: JSON.stringify(payload) }),

  update: (id: string, updates: object) =>
    request(`/sites/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),

  delete: (id: string) => request(`/sites/${id}`, { method: 'DELETE' }),

  publish: (id: string) => {
    if (!id || id === 'undefined') {
      console.error('[API] sites.publish called with invalid id:', id);
      return Promise.resolve({ data: null, error: 'Invalid site ID' });
    }
    return request(`/sites/${id}/publish`, { method: 'POST' });
  },

  getPublished: (subdomain: string) => request(`/sites/published/${subdomain}`),

  getPreview: (id: string) => {
    if (!id || id === 'undefined') {
      console.error('[API] sites.getPreview called with invalid id:', id);
      return Promise.resolve({ data: null, error: 'Invalid site ID' });
    }
    return request(`/sites/preview/${id}`);
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAGES
// ─────────────────────────────────────────────────────────────────────────────
export const pages = {
  list: (siteId: string) => {
    if (!siteId || siteId === 'undefined') {
      console.error('[API] pages.list called with invalid siteId:', siteId);
      return Promise.resolve({ data: null, error: 'Invalid site ID' });
    }
    return request(`/sites/${siteId}/pages`);
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const sections = {
  list: (siteId: string, pageId: string) => {
    if (!siteId || !pageId) {
      console.error('[API] sections.list called with invalid ids:', { siteId, pageId });
      return Promise.resolve({ data: null, error: 'Invalid site or page ID' });
    }
    return request(`/sites/${siteId}/pages/${pageId}/sections`);
  },

  update: (id: string, content: object) =>
    request(`/sites/sections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),

  delete: (id: string) => request(`/sites/sections/${id}`, { method: 'DELETE' }),

  reorder: (updates: { id: string; order: number }[]) =>
    request('/sites/sections/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ sections: updates }),
    }),
};

// ─────────────────────────────────────────────────────────────────────────────
//  SUBSCRIPTION
// ─────────────────────────────────────────────────────────────────────────────
export const subscription = {
  get: () => request('/sites/subscription/me'),
};
