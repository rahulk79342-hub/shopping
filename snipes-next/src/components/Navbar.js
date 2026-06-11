"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const { cartCount } = useCart();
  const { openCartDrawer, openSearch } = useUI();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if scrolled past top
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <motion.div
          initial={{ backgroundColor: "transparent", backdropFilter: "none" }}
          animate={{
            backgroundColor: "transparent",
            backdropFilter: "none",
            borderBottom: isScrolled ? "1px solid rgba(10, 10, 10, 0.08)" : "1px solid transparent"
          }}
          transition={{ duration: 0.4 }}
          className="w-full transition-all duration-300"
        >
          <div className="flex justify-between items-center w-full px-[var(--spacing-margin-mobile)] h-15 md:h-15 max-w-screen-2xl mx-auto relative sticky bg-white">

            {/* Left: Logo & Name */}
            <div className="flex items-center gap-3 z-10 w-1/4">
              <button className="md:hidden hover:opacity-80 transition-opacity active:scale-95 duration-150 cursor-pointer mr-2">
                <span className="material-symbols-outlined text-[var(--color-primary)]">menu</span>
              </button>
              <motion.div
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-primary)]">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] md:text-[32px] font-extrabold tracking-tighter text-[var(--color-primary)] hover:opacity-90 transition-opacity">
                  DEMO
                </Link>
              </motion.div>
            </div>

            {/* Center: Desktop Links */}
            <div className="hidden md:flex justify-center w-2/4 z-10">
              <nav className="flex gap-10">
                {['New Arrivals', 'Linen', 'Old Money'].map((item) => (
                  <Link
                    key={item}
                    href="/discover"
                    className="relative group font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-[0.15em] text-[var(--color-primary)] py-2"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center justify-end gap-6 z-10 w-1/4">
              <button onClick={openSearch} className="hover:opacity-80 hover:-translate-y-0.5 transition-all active:scale-95 duration-300 cursor-pointer text-[var(--color-primary)]">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </button>
              <button onClick={openCartDrawer} className="relative hover:opacity-80 hover:-translate-y-0.5 transition-all active:scale-95 duration-300 cursor-pointer text-[var(--color-primary)] flex items-center gap-2">
                <span className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest hidden md:block">Bag</span>
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[var(--color-secondary)] text-[var(--color-on-secondary)] text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

    </>
  );
}
