"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ReturnsEntryPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId || !email) return;
    setIsSubmitting(true);
    // Directly navigate to the specific order's return flow
    router.push(`/returns/${orderId}?email=${encodeURIComponent(email)}`);
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] flex flex-col justify-center items-center px-4 md:px-0">
      
      <Link href="/" className="font-[var(--font-family-display-lg)] text-[32px] font-extrabold tracking-tighter text-[var(--color-primary)] mb-8">
        DEMO
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-xl relative overflow-hidden"
      >
        <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[180px] opacity-[0.03]" style={{fontVariationSettings: "'FILL' 1"}}>keyboard_return</span>
        
        <div className="relative z-10">
          <h1 className="font-[var(--font-family-headline-md)] text-2xl text-center mb-2">Returns & Exchanges</h1>
          <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-center mb-8">
            Enter your order details below to start a return or exchange.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-outline)] mb-2">Order Number</label>
              <input 
                type="text" 
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="e.g. ORD-12345" 
                className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>
            
            <div>
              <label className="block font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-outline)] mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email used for purchase" 
                className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Locating Order...' : 'Start Return'}
            </button>
          </form>

          <p className="text-center text-[12px] text-[var(--color-outline)] mt-6">
            Need help? <Link href="/contact" className="text-[var(--color-primary)] underline">Contact Support</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
