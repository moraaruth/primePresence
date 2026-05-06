// ─────────────────────────────────────────────────────────────────────────────
//  supabase.ts — COMPATIBILITY SHIM (no Supabase used)
//  Re-exports the real API client so any file still importing createClient()
//  continues to work while we migrate pages to import from api.ts directly.
// ─────────────────────────────────────────────────────────────────────────────
export { auth, sites, pages, sections, subscription, token } from './api';

// createClient kept for backward compat — returns the api modules
export function createClient() {
  return { _shim: true };
}
