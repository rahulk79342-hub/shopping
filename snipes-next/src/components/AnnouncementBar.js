"use client";
import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const announcements = [
    "FREE SHIPPING ON ALL ORDERS OVER RS. 2000",
    "NEW DROP: LINEN COLLECTION 2026",
    "GET 10% OFF YOUR FIRST ORDER"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // return (
  //   // <div className="bg-[var(--color-primary)] text-[var(--color-on-primary)] h-[32px] md:h-8 flex items-center justify-center relative z-50">
  //   //   <p className="font-[var(--font-family-label-caps)] text-[10px] tracking-widest uppercase animate-fade-in-up" key={currentIndex}>
  //   //     {announcements[currentIndex]}
  //   //   </p>
  //   // </div>
  // );
}
