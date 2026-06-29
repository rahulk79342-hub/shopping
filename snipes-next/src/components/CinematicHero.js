"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import MagneticButton from "./MagneticButton";
import HolographicCard from "./HolographicCard";

export default function CinematicHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax for WebGL-like 3D depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-3deg", "3deg"]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);
  
  // Metallic text shine tied to mouse
  const shinePositionX = useTransform(smoothMouseX, [-0.5, 0.5], ["100%", "0%"]);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black flex items-center justify-center cursor-none perspective-1000"
    >
      {/* Background layer with parallax */}
      <motion.div 
        style={{ y: yBg, opacity }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <Image 
          src="https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Cinematic Hero"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* Subtle noise/grain overlay for premium texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')] opacity-30 mix-blend-overlay"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </motion.div>

      {/* 3D Foreground Container */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between pointer-events-none"
      >
        
        <div className="md:w-1/2 flex flex-col items-start" style={{ transform: "translateZ(50px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-[#C2B280] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block drop-shadow-[0_0_10px_rgba(194,178,128,0.5)]">
              The Aura Collection
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text relative"
            style={{ 
              backgroundImage: "linear-gradient(to right, #fff 0%, #aaa 30%, #fff 50%, #555 70%, #fff 100%)",
              backgroundSize: "200% auto",
              backgroundPositionX: shinePositionX,
              WebkitBackgroundClip: "text",
              fontFamily: "var(--font-family-headline-lg)"
            }}
          >
            Define<br/>Your<br/>Legacy.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pointer-events-auto"
            style={{ transform: "translateZ(30px)" }}
          >
            <MagneticButton strength={30}>
              <Link href="/discover" className="relative group overflow-hidden px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <span className="font-bold uppercase tracking-widest text-sm text-white group-hover:text-black z-10 relative">Shop The Drop</span>
                {/* Button Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating Holographic Product Card */}
        <motion.div 
          className="hidden md:block md:w-[35%] relative pointer-events-auto"
          style={{ transform: "translateZ(80px)" }}
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
        >
          <HolographicCard glareIntensity={0.6} className="shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-[3/4] w-full bg-[#111] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1523398002811-999aa8e9dd20?q=80&w=800&auto=format&fit=crop"
                alt="Featured Product"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-ultra-dark p-4 rounded-xl flex justify-between items-center backdrop-blur-xl border border-white/10">
                  <div>
                    <p className="text-white text-sm font-bold uppercase tracking-wider">Aura Exclusive</p>
                    <p className="text-gray-400 text-xs mt-1">Utility Vest 01</p>
                  </div>
                  <span className="text-[#C2B280] font-mono font-bold">$240</span>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-full bg-white origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "circInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
