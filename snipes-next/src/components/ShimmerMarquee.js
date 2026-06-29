"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ShimmerMarquee() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });
  
  // Moves text left-to-right or right-to-left based on scroll
  const x1 = useTransform(smoothScroll, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(smoothScroll, [0, 1], ["-50%", "0%"]);

  const texts = [
    "PREMIUM STREETWEAR",
    "AURA INTELLIGENCE",
    "LIMITED DROPS",
    "THE VAULT",
    "NEO-UTILITY"
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[var(--color-background)] overflow-hidden relative border-y border-gray-100 flex flex-col gap-4">
      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap will-change-transform">
        {[...texts, ...texts, ...texts].map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-stroke hover:text-[var(--color-primary)] transition-colors duration-300"
            style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}
          >
            {text} <span className="text-[#C2B280] mx-4 opacity-50">&bull;</span>
          </span>
        ))}
      </motion.div>
      
      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap will-change-transform">
        {[...texts, ...texts, ...texts].reverse().map((text, i) => (
          <span 
            key={i} 
            className="text-[60px] md:text-[120px] font-black uppercase tracking-tighter mx-4 leading-none select-none text-stroke hover:text-[var(--color-primary)] transition-colors duration-300"
            style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}
          >
            {text} <span className="text-[#C2B280] mx-4 opacity-50">&bull;</span>
          </span>
        ))}
      </motion.div>

      {/* Decorative gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-[var(--color-background)] pointer-events-none z-10"></div>
    </section>
  );
}
