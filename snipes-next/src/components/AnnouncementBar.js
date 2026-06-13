"use client";
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 33 });
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Live Countdown Timer logic
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 24; // Reset to loop for demo
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [mounted]);

  const formatTime = (val) => val.toString().padStart(2, '0');

  const announcements = [
    "⚡ Snipes Bakrid Collections Live!! ⚡",
    "Free Shipping on all orders over ₹2000",
    `Flash Sale ends in ${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`
  ];

  // Auto-slide logic
  useEffect(() => {
    if (!mounted) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000); // 4s auto-slide

    return () => clearInterval(slideInterval);
  }, [announcements.length, mounted]);

  // Prevent layout shift during SSR hydration
  if (!mounted) {
    return (
      <div className="w-full bg-[#f8f8f8] text-center py-2 text-[11px] md:text-[12px] font-semibold tracking-wide border-b border-gray-200 z-[60] relative h-[34px] overflow-hidden flex items-center justify-center">
        <span className="opacity-0">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8f8f8] text-center py-2 text-[11px] md:text-[12px] font-semibold tracking-wide border-b border-gray-200 z-[60] relative h-[34px] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute w-full px-4"
        >
          {announcements[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
