// ─────────────────────────────────────────────────────────────────────────────
//  API CLIENT — replaces Supabase entirely
//  All requests go to our Express + MongoDB backend
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// ── Token helpers (localStorage) ─────────────────────────────────────────────
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

const setToken = (token: string) => localStorage.setItem('accessToken', token);
const clearToken = () => localStorage.removeItem('accessToken');

// ── Core fetch wrapper ────────────────────────────────────────────────────────
async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    let res = await fetch(`${BASE_URL}${path}`, { ...options, headers, credentials: 'include' });

    // Auto-refresh on 401
    if (res.status === 401 && path !== '/auth/login' && path !== '/auth/refresh') {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        setToken(refreshData.data.accessToken);
        headers['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
        res = await fetch(`${BASE_URL}${path}`, { ...options, headers, credentials: 'include' });
      } else {
        clearToken();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return { data: null, error: 'Session expired' };
      }
    }

    const json = await res.json();
    if (!res.ok) return { data: null, error: json.message || 'Request failed' };
    return { data: json.data ?? json, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Network error' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────────────────────
export const auth = {
  signUp: async (email: string, password: string, fullName: string) => {
    const [firstName, ...rest] = fullName.trim().split(' ');
    const { data, error } = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName: rest.join(' '), email, password }),
    });
    if (data?.accessToken) setToken(data.accessToken);
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data?.accessToken) setToken(data.accessToken);
    return { data, error };
  },

  signOut: async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    clearToken();
  },

  getUser: async () => {
    if (!getToken()) return { data: { user: null }, error: null };
    return apiFetch('/auth/me');
  },

  // Google OAuth — redirect to backend OAuth endpoint
  signInWithGoogle: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  SITES
// ─────────────────────────────────────────────────────────────────────────────
export const sites = {
  list: () => apiFetch('/sites'),

  get: (id: string) => apiFetch(`/sites/${id}`),

  generate: (data: object) =>
    apiFetch('/sites/generate', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, updates: object) =>
    apiFetch(`/sites/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),

  delete: (id: string) => apiFetch(`/sites/${id}`, { method: 'DELETE' }),

  publish: (id: string) => apiFetch(`/sites/${id}/publish`, { method: 'POST' }),

  getPublished: (subdomain: string) => apiFetch(`/sites/published/${subdomain}`),
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAGES
// ─────────────────────────────────────────────────────────────────────────────
export const pages = {
  list: (siteId: string) => apiFetch(`/sites/${siteId}/pages`),
};

// ─────────────────────────────────────────────────────────────────────────────
//  SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const sections = {
  list: (siteId: string, pageId: string) =>
    apiFetch(`/sites/${siteId}/pages/${pageId}/sections`),

  update: (id: string, content: object) =>
    apiFetch(`/sites/sections/${id}`, { method: 'PATCH', body: JSON.stringify({ content }) }),

  delete: (id: string) => apiFetch(`/sites/sections/${id}`, { method: 'DELETE' }),

  reorder: (sectionUpdates: { id: string; order: number }[]) =>
    apiFetch('/sites/sections/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ sections: sectionUpdates }),
    }),
};

// ─────────────────────────────────────────────────────────────────────────────
//  SUBSCRIPTION
// ─────────────────────────────────────────────────────────────────────────────
export const subscription = {
  get: () => apiFetch('/sites/subscription/me'),
};

// ─────────────────────────────────────────────────────────────────────────────
//  LEADS (contact form)
// ─────────────────────────────────────────────────────────────────────────────
export const leads = {
  submit: (data: object) =>
    apiFetch('/leads', { method: 'POST', body: JSON.stringify(data) }),
};
