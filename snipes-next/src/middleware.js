import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  // A/B Testing Edge Logic
  const url = request.nextUrl.clone();
  let bucket = request.cookies.get('ab-test-bucket')?.value;
  
  if (!bucket) {
    bucket = Math.random() < 0.5 ? 'variant-a' : 'variant-b';
  }

  // Example: Rewrite checkout to a different variant if bucket is B
  // if (url.pathname === '/checkout' && bucket === 'variant-b') {
  //   url.pathname = '/checkout-b';
  //   return NextResponse.rewrite(url);
  // }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Inject bucket cookie if it didn't exist
  if (!request.cookies.has('ab-test-bucket')) {
    supabaseResponse.cookies.set('ab-test-bucket', bucket);
  }

  // MOCK FALLBACK
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const hasMockSession = request.cookies.has('mock-session');
    
    // Protect /account
    if (request.nextUrl.pathname.startsWith('/account') && !hasMockSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    
    // Redirect away from login if already authed
    if (request.nextUrl.pathname.startsWith('/login') && hasMockSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/account';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // REAL SUPABASE MIDDLEWARE
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Admin Protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if real user has an 'admin' role in their user_metadata or mock session is 'admin'
    // For simplicity, we assume an admin flag in user_metadata or allow mock-session
    const isAdmin = user?.user_metadata?.role === 'admin' || request.cookies.get('mock-session')?.value === 'admin';
    
    // TEMPORARY: Allow all authenticated users into /admin for demo purposes
    // IN PRODUCTION: uncomment the line below to strictly enforce admin role
    // if (!isAdmin) return NextResponse.redirect(new URL('/', request.url));
    
    if (!user && !request.cookies.has('mock-session')) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Protect /account
  if (request.nextUrl.pathname.startsWith('/account') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect away from login if already authed
  if (request.nextUrl.pathname.startsWith('/login') && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/account';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
