"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { MdOutlineCameraAlt, MdOutlineQrCodeScanner, MdOutlineViewInAr } from 'react-icons/md';

export default function ARVirtualTryOnShowcase() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#020202] overflow-hidden flex items-center justify-center min-h-[90vh]">
      
      {/* Background Cyber-grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDMiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          className="lg:w-5/12 flex flex-col items-start"
          style={{ opacity, scale }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MdOutlineViewInAr className="text-purple-400 text-2xl" />
            <span className="text-purple-400 font-bold tracking-[0.3em] uppercase text-xs">Aura Vision OS</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9] text-white mb-6">
            Try It On.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">In Reality.</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 leading-relaxed font-[var(--font-family-body-md)]">
            Experience our bleeding-edge WebAR engine. Neural body mapping perfectly drapes digital garments onto your frame in real-time. No apps, no downloads. Just magic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="relative group overflow-hidden px-8 py-4 bg-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
              <MdOutlineCameraAlt className="text-black text-xl z-10" />
              <span className="font-bold text-black uppercase tracking-widest text-sm z-10">Activate Camera</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] z-0" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 rounded-full flex items-center justify-center gap-3 hover:bg-white/5 transition-colors text-white">
              <MdOutlineQrCodeScanner className="text-xl" />
              <span className="font-bold uppercase tracking-widest text-sm">Scan Code</span>
            </button>
          </div>
        </motion.div>

        {/* Right Visuals (Parallax Devices) */}
        <div className="lg:w-7/12 relative h-[600px] w-full perspective-1000">
          
          {/* Back Device - Wireframe */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute right-0 md:right-[10%] top-[10%] w-[280px] md:w-[320px] aspect-[9/16] bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl z-10"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
            {/* HUD Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#00ff00]">
                <span className="text-[10px] font-mono tracking-widest">SCANNING</span>
                <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-ping" />
              </div>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent animate-[shimmer_2s_infinite]" />
              <div className="text-[#00ff00] font-mono text-xs">
                <p>Mesh: ACTIVE</p>
                <p>Tracking: 98%</p>
              </div>
            </div>
            {/* Wireframe Grid */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMjBoMjBNMjAgMHYyMCIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] mix-blend-screen" />
          </motion.div>

          {/* Front Device - AR Result */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute left-0 md:left-[10%] top-[20%] w-[300px] md:w-[350px] aspect-[9/16] bg-[#0a0a0a] border border-white/20 rounded-[36px] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] z-20 backdrop-blur-md"
          >
            <Image 
              src="https://images.unsplash.com/photo-1523398002811-999aa8e9dd20?q=80&w=600&auto=format&fit=crop" 
              alt="AR Result" 
              fill 
              className="object-cover opacity-90"
            />
            {/* Glassmorphic UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-sm">Tech Vest 02</h4>
                <p className="text-purple-300 text-xs font-bold">$185.00</p>
              </div>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <MdOutlineViewInAr className="text-black text-xl" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
