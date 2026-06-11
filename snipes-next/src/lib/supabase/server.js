import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  // MOCK FALLBACK: If we lack real keys, return a mock client that reads our 'mock-session' cookie
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      auth: {
        getUser: async () => {
          const hasMockSession = cookieStore.has('mock-session');
          if (hasMockSession) {
            return { data: { user: { id: 'usr_mock_123', email: 'vip@snipes.com' } }, error: null };
          }
          return { data: { user: null }, error: new Error('No mock session') };
        }
      }
    };
  }

  // REAL SUPABASE CLIENT
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
