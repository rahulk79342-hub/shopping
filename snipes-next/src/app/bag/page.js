"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUI } from '@/context/UIContext';

export default function BagPage() {
  const router = useRouter();
  const { openCartDrawer } = useUI();

  useEffect(() => {
    // In our premium SPA, the bag is a drawer. 
    // Redirect to home and open drawer for best UX.
    router.replace('/');
    openCartDrawer();
  }, [router, openCartDrawer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
