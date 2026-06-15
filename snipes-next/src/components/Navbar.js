"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { MdOutlineMenu, MdOutlineSearch, MdOutlinePerson, MdOutlineShoppingBag } from 'react-icons/md';

export default function Navbar() {
  const cartCount = useCartStore(state => state.cartCount());
  const { openCartDrawer, openSearch } = useUI();
  const { wishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if scrolled past top
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full">
        <motion.div
          initial={{ backgroundColor: "transparent", backdropFilter: "none" }}
          animate={{
            backgroundColor: "#F3F3F3",
            backdropFilter: "blur(10px)",
            borderBottom: isScrolled ? "1px solid rgba(10, 10, 10, 0.08)" : "1px solid rgba(10, 10, 10, 0.08)"
          }}
          transition={{ duration: 0.4 }}
          className="w-full transition-all duration-300 bg-[#F3F3F3]"
        >
          <div className={`flex justify-between items-center w-full px-[var(--spacing-margin-mobile)] h-14 md:h-16 max-w-screen-2xl mx-auto relative transition-colors duration-500 bg-[#F3F3F3]`}>

            {/* Left: Menu & Search */}
            <div className={`flex items-center gap-4 z-10 flex-1 md:flex-none md:w-1/4 transition-colors duration-500 text-black`}>
              <button className="hover:opacity-80 transition-opacity active:scale-95 duration-150 cursor-pointer">
                <MdOutlineMenu className="text-[24px]" />
              </button>
              <button onClick={openSearch} className="hover:opacity-80 transition-all active:scale-95 duration-300 cursor-pointer flex items-center">
                <MdOutlineSearch className="text-[24px]" />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center flex-1 z-10 absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="font-black text-[32px] tracking-tighter hover:opacity-90 transition-opacity uppercase font-[var(--font-family-display-lg)]">
                SNIPES
              </Link>
            </div>

            {/* Right: Icons (Profile, Cart) */}
            <div className={`flex items-center justify-end gap-4 md:gap-6 z-10 flex-1 md:flex-none md:w-1/4 transition-colors duration-500 text-black`}>
              <Link href="/account" className="flex hover:opacity-80 transition-all active:scale-95 duration-300 cursor-pointer items-center">
                <MdOutlinePerson className="text-[24px]" />
              </Link>

              <button onClick={openCartDrawer} className="relative hover:opacity-80 transition-all active:scale-95 duration-300 cursor-pointer flex items-center gap-2">
                <MdOutlineShoppingBag className="text-[24px]" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold shadow-sm">
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
