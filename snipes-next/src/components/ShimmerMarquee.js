"use client";
import { motion } from 'framer-motion';

export default function ShimmerMarquee() {
  const texts = [
    "PREMIUM STREETWEAR",
    "AURA INTELLIGENCE",
    "LIMITED DROPS",
    "THE VAULT",
    "NEO-UTILITY"
  ];

  return (
    <section className="py-24 bg-[var(--color-background)] overflow-hidden relative border-y border-gray-100 flex flex-col gap-4">
      {/* Row 1 - Left to Right */}
      <motion.div 
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...texts, ...texts, ...texts, ...texts].map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-transparent bg-clip-text"
            style={{ 
              backgroundImage: "linear-gradient(to bottom, #d4af37, #aa7700, #d4af37)",
              WebkitTextStroke: "1px rgba(212, 175, 55, 0.4)" 
            }}
          >
            {text} <span className="text-white mx-4 opacity-50">&bull;</span>
          </span>
        ))}
      </motion.div>
      
      {/* Row 2 - Right to Left */}
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...texts, ...texts, ...texts, ...texts].reverse().map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-transparent bg-clip-text"
            style={{ 
              backgroundImage: "linear-gradient(to top, #ffffff, #888888, #ffffff)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)" 
            }}
          >
            {text} <span className="text-[#d4af37] mx-4 opacity-50">&bull;</span>
          </span>
        ))}
      </motion.div>

      {/* Decorative gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none z-10"></div>
    </section>
  );
}
