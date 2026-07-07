"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import MagneticButton from "./MagneticButton";
import HolographicCard from "./HolographicCard";

// Staggered text reveal variants
const textContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 * i },
  }),
};

const textChild = {
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    textShadow: ["2px 0 0 rgba(255,0,0,0), -2px 0 0 rgba(0,255,255,0)", "4px 0 0 rgba(255,0,0,0.8), -4px 0 0 rgba(0,255,255,0.8)", "0px 0 0 rgba(255,0,0,0), 0px 0 0 rgba(0,255,255,0)"],
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      textShadow: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" }
    },
  },
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(20px)",
    textShadow: "0px 0 0 rgba(255,0,0,0), 0px 0 0 rgba(0,255,255,0)"
  },
};

export default function CinematicHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tracking for spotlight and parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Raw pixel coordinates for the spotlight effect
  const mouseXPixel = useMotionValue(0);
  const mouseYPixel = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Increased ranges for deeper 3D effect
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], ["-5%", "5%"]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], ["-5%", "5%"]);
  
  // Dynamic spotlight mask
  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseXPixel}px ${mouseYPixel}px, rgba(255, 255, 255, 1), transparent 80%)`;

  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const clientX = e.clientX - left;
    const clientY = e.clientY - top;
    
    // Normalized for 3D tilt
    const x = clientX / width - 0.5;
    const y = clientY / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Pixel perfect for spotlight
    mouseXPixel.set(clientX);
    mouseYPixel.set(clientY);
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
        // Reset spotlight to center
        if (containerRef.current) {
          mouseXPixel.set(containerRef.current.offsetWidth / 2);
          mouseYPixel.set(containerRef.current.offsetHeight / 2);
        }
      }}
      className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-[#020202] flex items-center justify-center perspective-1000"
    >
      {/* Dynamic Lens Flare Sweep */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen opacity-50">
        <div className="absolute top-0 -left-[100%] w-[200%] h-[20px] bg-white blur-[20px] rotate-[-45deg] animate-[shimmer_8s_infinite_ease-in-out]"></div>
      </div>

      {/* Floating Glassmorphic Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-white/5 backdrop-blur-3xl border border-white/10"
          animate={{ y: [0, -50, 0], x: [0, 30, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(-100px)" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-500/10 backdrop-blur-3xl border border-purple-500/20"
          animate={{ y: [0, 60, 0], x: [0, -40, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transform: "translateZ(-150px)" }}
        />
      </div>

      {/* Background layer with parallax */}
      <motion.div 
        style={{ y: yBg, opacity }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
      >
        <video 
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-lights-5129-large.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
        />
        {/* Subtle noise/grain overlay for premium texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay"></div>
        {/* Deep Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
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
        className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between pointer-events-none mt-16 md:mt-0"
      >
        
        <div className="w-full md:w-3/5 flex flex-col items-start" style={{ transform: "translateZ(80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-purple-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 block drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              The Aura Collection
            </span>
          </motion.div>

          {/* Staggered Blur Reveal Text */}
          <div className="relative mb-10">
            <motion.h1 
              variants={textContainer}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-[130px] font-extrabold uppercase tracking-tighter leading-[0.85] text-white"
              style={{ fontFamily: "var(--font-family-headline-lg)" }}
            >
              <motion.div variants={textChild}>Redefine</motion.div>
              <motion.div variants={textChild} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">The Rules</motion.div>
              <motion.div variants={textChild}>Of Style.</motion.div>
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="pointer-events-auto"
            style={{ transform: "translateZ(40px)" }}
          >
            <MagneticButton strength={40}>
              <Link href="/discover" className="relative group overflow-hidden px-12 py-5 bg-black/40 backdrop-blur-3xl border border-purple-500/30 rounded-full flex items-center justify-center gap-3 hover:bg-black/80 hover:border-purple-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_30px_rgba(147,51,234,0.2)] hover:shadow-[0_0_60px_rgba(147,51,234,0.6)]">
                <span className="font-black uppercase tracking-[0.2em] text-sm text-white group-hover:text-purple-300 transition-colors z-10 relative">Explore Collection</span>
                {/* Button Light Sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent skew-x-12 z-0" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating Holographic Product Card */}
        <motion.div 
          className="hidden md:block md:w-2/5 max-w-[450px] relative pointer-events-auto mt-12 md:mt-0"
          style={{ transform: "translateZ(120px)" }}
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.6, type: "spring", bounce: 0.4 }}
        >
          <HolographicCard glareIntensity={0.8} className="shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 rounded-[32px]">
            <div className="relative aspect-[3/4] w-full bg-[#0a0a0a] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1523398002811-999aa8e9dd20?q=80&w=1000&auto=format&fit=crop"
                alt="Featured Product"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {/* Internal Glass Glare */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/60 p-6 rounded-[24px] flex justify-between items-center backdrop-blur-3xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div>
                    <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 shadow-black drop-shadow-md">Aura Exclusive</p>
                    <p className="text-white text-base font-bold tracking-widest uppercase">Utility Vest 01</p>
                  </div>
                  <span className="text-white font-mono font-bold text-xl drop-shadow-md">$240</span>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
