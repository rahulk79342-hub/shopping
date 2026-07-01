"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ShimmerMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const texts = [
    "PREMIUM STREETWEAR",
    "AURA INTELLIGENCE",
    "LIMITED DROPS",
    "THE VAULT",
    "NEO-UTILITY"
  ];

  return (
    <section 
      className="py-24 bg-[#050505] overflow-hidden relative border-y border-white/5 flex flex-col gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Row 1 - Left to Right */}
      <motion.div 
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 70 : 35 }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...texts, ...texts, ...texts, ...texts].map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-700"
            style={{ 
              backgroundImage: "linear-gradient(to bottom, #d4af37, #e5c158, #aa7700)",
              WebkitTextStroke: "1px rgba(212, 175, 55, 0.4)" 
            }}
          >
            {text} <span className="text-white mx-4 opacity-30 group-hover:opacity-80 transition-opacity duration-700 text-[60px]">&bull;</span>
          </span>
        ))}
      </motion.div>
      
      {/* Row 2 - Right to Left */}
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 90 : 45 }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...texts, ...texts, ...texts, ...texts].reverse().map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-700"
            style={{ 
              backgroundImage: "linear-gradient(to top, #ffffff, #aaaaaa, #ffffff)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)" 
            }}
          >
            {text} <span className="text-[#d4af37] mx-4 opacity-30 group-hover:opacity-80 transition-opacity duration-700 text-[60px]">&bull;</span>
          </span>
        ))}
      </motion.div>

      {/* Decorative gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none z-10"></div>
    </section>
  );
}
