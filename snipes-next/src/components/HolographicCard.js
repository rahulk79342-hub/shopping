"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HolographicCard({ children, className = "", glareIntensity = 0.4 }) {
  const ref = useRef(null);
  
  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Transform values to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Transform values for the glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const handleMouseMove = (e) => {
    if (!isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isDesktop ? rotateX : 0,
        rotateY: isDesktop ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl overflow-hidden cursor-none ${className}`}
    >
      {/* Underlying content */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full relative z-0">
        {children}
      </div>

      {/* Holographic Glare Layer */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255,255,255,${glareIntensity}) 0%,
              rgba(255,255,255,0) 60%
            )`,
            opacity: isHovered ? 1 : 0,
            x: glareX,
            y: glareY,
            scale: 2.5,
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      )}
      
      {/* Subtle colorful shimmer edge on hover */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-3xl border border-white/0 transition-colors duration-500"
          style={{
            borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0)",
            boxShadow: isHovered ? "inset 0 0 20px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)" : "none"
          }}
        />
      )}
    </motion.div>
  );
}
