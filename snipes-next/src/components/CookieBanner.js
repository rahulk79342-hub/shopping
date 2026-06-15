"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('snipes_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't instantly snap in on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('snipes_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="material-symbols-outlined text-[20px] text-black">cookie</span>
            <p className="text-[13px] text-gray-600 leading-snug">
              We use cookies to personalize content, tailor our marketing, and improve your premium shopping experience. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
            <Link href="/privacy" className="text-[12px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors underline underline-offset-4">
              Preferences
            </Link>
            <button 
              onClick={handleAccept}
              className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-gray-800 transition-colors whitespace-nowrap w-full md:w-auto text-center"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
