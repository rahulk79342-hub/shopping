"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRecentStore } from '@/store/useRecentStore';
import ProductCard from '@/components/ProductCard';

export default function HistoryPage() {
  const viewedItems = useRecentStore(state => state.recentProducts);
  const clearRecent = useRecentStore(state => state.clearRecent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[var(--color-surface)]"></div>;

  return (
    <main className="min-h-screen bg-[var(--color-surface)] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-outline-variant)] py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)]">
          SNIPES
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/account" className="text-[12px] font-[var(--font-family-label-caps)] uppercase tracking-widest text-[var(--color-outline)] hover:text-[var(--color-primary)]">
            My Account
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-[var(--font-family-headline-md)] text-3xl mb-2">Recently Viewed</h1>
            <p className="text-[14px] text-[var(--color-outline)]">Your browsing history.</p>
          </div>
          {viewedItems.length > 0 && (
            <button 
              onClick={clearRecent}
              className="text-[12px] text-[var(--color-error)] uppercase tracking-widest font-bold hover:underline"
            >
              Clear History
            </button>
          )}
        </div>

        {viewedItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-[var(--color-outline-variant)]">
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4 block">history</span>
            <p className="text-[16px] text-[var(--color-primary)] mb-6">You haven't viewed any products recently.</p>
            <Link href="/" className="inline-block bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest px-8 py-4 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {viewedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
