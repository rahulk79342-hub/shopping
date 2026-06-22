"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';

export default function Craftsmanship() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center my-12 md:my-24"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <Image 
          src="/images/craftsmanship_hero.png"
          alt="Premium Sneaker Materials and Craftsmanship"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <motion.div 
          style={{ opacity }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">
              Uncompromising Quality
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              The Art of<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Sneaker Culture.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-md">
              We don&apos;t just sell shoes. We curate masterpieces. From premium leathers to innovative cushioning, discover the details that define greatness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              href="/collections/premium"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">Explore The Premium Collection</span>
              <div className="absolute inset-0 bg-gray-200 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Floating Accent Detail */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 flex items-center gap-4 hidden md:flex"
      >
        <div className="w-12 h-[1px] bg-white/30"></div>
        <span className="text-white/50 text-xs font-mono tracking-widest uppercase">Premium Selection</span>
      </motion.div>
    </section>
  );
}
