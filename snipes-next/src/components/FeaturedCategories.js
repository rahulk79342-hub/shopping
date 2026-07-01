import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';
import { categorizedImages } from '@/lib/supabase';
import HolographicCard from '@/components/HolographicCard';
import MagneticButton from '@/components/MagneticButton';

const CATEGORIES = [
  { id: 1, title: 'Printed', items: '33 items', img: categorizedImages.shirts[0], link: '/discover' },
  { id: 2, title: 'Stripes', items: '20 items', img: categorizedImages.shirts[1], link: '/discover' },
  { id: 3, title: 'Solid', items: '45 items', img: categorizedImages.shirts[2], link: '/discover' },
  { id: 4, title: 'Denim', items: '43 items', img: categorizedImages.bottoms[0], link: '/discover' },
  { id: 5, title: 'Linen', items: '18 items', img: categorizedImages.shirts[3], link: '/discover' },
  { id: 6, title: 'Shorts', items: '25 items', img: categorizedImages.bottoms[1], link: '/discover' },
  { id: 7, title: 'Accessories', items: '12 items', img: categorizedImages.accessories[0], link: '/discover' },
  { id: 8, title: 'Outerwear', items: '8 items', img: categorizedImages.shirts[4], link: '/discover' },
];

export default function FeaturedCategories() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section className="w-full pt-6 md:pt-16 pb-10 overflow-hidden bg-[#050505] border-b border-white/5 relative">
      {/* Custom Cursor for Drag */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full pointer-events-none z-[100] flex items-center justify-center border border-white/20 shadow-2xl mix-blend-difference hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Drag</span>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto">
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-8 pt-4 snap-x hide-scrollbar px-4 md:px-8 xl:px-12 items-start cursor-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {CATEGORIES.map(cat => (
            <Link href={cat.link} key={cat.id} className="snap-start flex flex-col md:items-start items-center gap-2 md:gap-4 flex-shrink-0 group w-[72px] md:w-[220px]">
              
              {/* 3D Image Container */}
              <HolographicCard glareIntensity={0.4} className="relative w-[72px] h-[72px] md:w-full md:h-auto md:aspect-[4/5] rounded-full md:rounded-3xl bg-[#1A1A1A] border-[1.5px] md:border border-white/10 shadow-sm md:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_30px_60px_rgba(147,51,234,0.15)] group-hover:border-white/20 transition-all duration-500">
                <Image 
                  src={cat.img} 
                  fill 
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100" 
                  sizes="(max-width: 768px) 72px, 220px" 
                  alt={cat.title} 
                />
              </HolographicCard>

              {/* Text Content with Magnetic Arrow */}
              <div className="flex md:w-full flex-col md:flex-row justify-between items-center md:items-start pointer-events-auto">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[11px] md:text-[18px] font-semibold md:font-black text-white text-center md:text-left whitespace-nowrap uppercase tracking-tight">{cat.title}</span>
                  <span className="hidden md:block text-[12px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">{cat.items}</span>
                </div>
                
                {/* Desktop Arrow wrapped in MagneticButton */}
                <div className="hidden md:block">
                  <MagneticButton strength={20}>
                    <div className="flex w-9 h-9 rounded-full bg-white items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-blue-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-black group-hover:text-white text-[18px] -rotate-45" style={{ fontVariationSettings: "'wght' 700" }}>arrow_forward</span>
                    </div>
                  </MagneticButton>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
