"use client";
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { MdOutlineLayers, MdOutlineScience } from 'react-icons/md';

export default function MaterialTechScanner() {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const maskImage = useMotionTemplate`radial-gradient(150px circle at ${smoothX}px ${smoothY}px, black 100%, transparent 100%)`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section className="relative w-full py-24 bg-[#020202] text-white overflow-hidden flex flex-col items-center">
      
      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col items-center mb-16 relative z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-4">
          <MdOutlineScience className="text-[#00ff00] text-xl" />
          <span className="text-[#00ff00] font-mono text-xs uppercase tracking-[0.3em]">Material Science</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-center">
          X-Ray <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff00] to-[#0088ff]">Inspection</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-4 tracking-widest uppercase">Hover over the garment to analyze inner layers.</p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full max-w-[1000px] aspect-[4/3] md:aspect-[16/9] mx-auto rounded-[40px] overflow-hidden cursor-none border border-white/10 shadow-[0_0_80px_rgba(0,255,0,0.05)] bg-[#0a0a0a]"
      >
        {/* Base Image (Outer Shell) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=1200')] bg-cover bg-center grayscale opacity-60" />
        
        {/* Wireframe/Data overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />

        {/* X-Ray Layer (Inner Tech) revealed by mask */}
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618216834164-1e0750fb57ce?q=80&w=1200')] bg-cover bg-center opacity-90 saturate-200"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {/* Neon Grid on X-Ray layer */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMjBoMjBNMjAgMHYyMCIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNCIvPgo8L3N2Zz4=')] mix-blend-screen pointer-events-none" />
        </motion.div>

        {/* Custom Cursor Ring */}
        <motion.div 
          className="absolute pointer-events-none rounded-full border-2 border-[#00ff00] shadow-[0_0_15px_#00ff00] flex items-center justify-center backdrop-blur-sm bg-black/10"
          style={{
            x: smoothX,
            y: smoothY,
            width: 300,
            height: 300,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isHovering ? 1 : 0
          }}
        >
          <div className="absolute top-4 text-[#00ff00] font-mono text-[10px] tracking-widest bg-black/80 px-2 py-1 rounded">GORE-TEX PRO</div>
          <div className="w-4 h-4 border-t-2 border-l-2 border-[#00ff00] absolute top-1/2 left-1/2 -translate-x-[40px] -translate-y-[40px]" />
          <div className="w-4 h-4 border-b-2 border-r-2 border-[#00ff00] absolute top-1/2 left-1/2 translate-x-[24px] translate-y-[24px]" />
        </motion.div>

      </div>
    </section>
  );
}
