"use server";
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginWithMagicLink(formData) {
  const email = formData.get('email');
  
  // MOCK FALLBACK
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log(`[Mock Auth] Sending Magic Link to ${email}`);
    
    // Simulate network delay
    // Removed simulated network latency for faster auth

    // To simulate a successful login link click, we just set the cookie now
    // In reality, this happens when they click the email link and hit the callback route
    const cookieStore = await cookies();
    cookieStore.set('mock-session', 'true', { path: '/' });
    
    redirect('/account');
  }

  // REAL SUPABASE
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function loginWithOAuth(provider) {
  // MOCK FALLBACK
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log(`[Mock Auth] Initiating OAuth for ${provider}`);
    const cookieStore = await cookies();
    cookieStore.set('mock-session', 'true', { path: '/' });
    redirect('/account');
  }

  // REAL SUPABASE
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function logout() {
  // MOCK FALLBACK
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const cookieStore = await cookies();
    cookieStore.delete('mock-session');
    redirect('/login');
  }

  // REAL SUPABASE
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
