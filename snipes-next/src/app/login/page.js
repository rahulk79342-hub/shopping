"use client";
import { useState } from 'react';
import Link from 'next/link';
import { loginWithMagicLink, loginWithOAuth } from '@/app/actions/auth';
import { motion } from 'framer-motion';
import { FaApple } from 'react-icons/fa';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsPending(true);
    
    // Server action automatically redirects on Mock
    // Or returns success state on real Supabase
    const res = await loginWithMagicLink(new FormData(e.target));
    
    if (res?.error) {
      setMessage(res.error);
    } else if (res?.success) {
      setMessage('Check your email for the magic link!');
    }
    
    setIsPending(false);
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] flex flex-col justify-center items-center px-4 md:px-0">
      
      <Link href="/" className="font-[var(--font-family-display-lg)] text-[32px] font-extrabold tracking-tighter text-[var(--color-primary)] mb-8">
        DEMO
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-white p-8 md:p-10 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-xl"
      >
        <h1 className="font-[var(--font-family-headline-md)] text-2xl text-center mb-2">Welcome Back</h1>
        <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-center mb-8">Sign in to your account or create one instantly.</p>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button 
            onClick={() => loginWithOAuth('google')}
            className="w-full border border-[var(--color-outline-variant)] py-3 rounded-[var(--border-radius-sm)] flex justify-center items-center gap-3 hover:bg-[var(--color-surface-container)] transition-colors"
          >
            {/* Google Icon SVG */}
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span className="font-[var(--font-family-body-md)] text-[14px]">Continue with Google</span>
          </button>

          <button 
            onClick={() => loginWithOAuth('apple')}
            className="w-full bg-black text-white border border-black py-3 rounded-[var(--border-radius-sm)] flex justify-center items-center gap-3 hover:bg-black/90 transition-colors"
          >
            <FaApple className="text-[20px]" />
            <span className="font-[var(--font-family-body-md)] text-[14px]">Continue with Apple</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-[var(--color-outline-variant)] flex-1"></div>
          <span className="font-[var(--font-family-label-caps)] text-[10px] uppercase text-[var(--color-outline)]">Or</span>
          <div className="h-[1px] bg-[var(--color-outline-variant)] flex-1"></div>
        </div>

        {/* Magic Link Form */}
        <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address" 
            className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)]"
            required
          />
          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors disabled:opacity-50"
          >
            {isPending ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm font-[var(--font-family-body-md)] rounded-[var(--border-radius-sm)] text-center">
            {message}
          </div>
        )}

      </motion.div>
    </main>
  );
}
