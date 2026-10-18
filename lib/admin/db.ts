import 'server-only';

import { createClient } from '@supabase/supabase-js';

export const BUCKET = 'auction-items';

export const isConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY && process.env.ADMIN_PASSWORD);

// Server-only client with the secret key: the auction_* tables have RLS on and
// no policies, so this is the only way in.
export function db() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Signed, short-lived URLs for private photos (bucket auction-items). */
export async function signedUrls(paths: string[], expiresIn = 60 * 60) {
  if (!paths.length) return {} as Record<string, string>;
  const { data } = await db().storage.from(BUCKET).createSignedUrls(paths, expiresIn);
  return Object.fromEntries((data ?? []).flatMap((d) => (d.path && d.signedUrl ? [[d.path, d.signedUrl] as const] : []))) as Record<string, string>;
}
