"use client";
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Hexagon, Fingerprint, Zap } from 'lucide-react';

const colorways = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    image: '/images/sneaker_cyber_neon.png',
    glow: 'rgba(57, 255, 20, 0.5)',
    accent: '#39ff14',
    stats: {
      hype: 99,
      comfort: 92,
      rarity: 'Ultra Rare'
    }
  },
  {
    id: 'obsidian-noir',
    name: 'Obsidian Noir',
    image: '/images/sneaker_obsidian_noir.png',
    glow: 'rgba(255, 255, 255, 0.1)',
    accent: '#888888',
    stats: {
      hype: 95,
      comfort: 98,
      rarity: 'Limited'
    }
  },
  {
    id: 'glacier-white',
    name: 'Glacier White',
    image: '/images/sneaker_glacier_white.png',
    glow: 'rgba(100, 200, 255, 0.5)',
    accent: '#64c8ff',
    stats: {
      hype: 97,
      comfort: 90,
      rarity: 'Exclusive'
    }
  }
];

export default function HolographicSneakerLab() {
  const [activeColorway, setActiveColorway] = useState(colorways[0]);
  const containerRef = useRef(null);

  // Mouse position values for 3D parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid motion
  const mouseXSpring = useSpring(x, { stiffness: 75, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 75, damping: 25 });

  // Transform values based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container (from -0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-black overflow-hidden flex items-center justify-center py-24">
      {/* Dynamic Background Glow */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 transition-colors duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColorway.glow} 0%, transparent 70%)`
        }}
      />
      
      {/* High-tech Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: 3D Holographic Display */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-square md:aspect-[4/3] perspective-[1500px] flex items-center justify-center cursor-crosshair group"
        >
          {/* Scanning Line Effect */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div 
              className="w-full h-1 shadow-[0_0_15px_3px] opacity-50"
              style={{ backgroundColor: activeColorway.accent, boxShadow: `0 0 15px 3px ${activeColorway.accent}` }}
              animate={{ y: ["0%", "1000%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </div>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Holographic Base Ring */}
            <motion.div 
              className="absolute bottom-[10%] w-[80%] h-[20%] rounded-[100%] border border-white/20 blur-[2px]"
              style={{ rotateX: "70deg", boxShadow: `0 0 30px ${activeColorway.glow}` }}
            />

            {/* Sneaker Image Wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeColorway.id}
                initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-4/5 h-4/5 z-10"
                style={{ translateZ: "50px" }}
              >
                <Image
                  src={activeColorway.image}
                  alt={activeColorway.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] pointer-events-none"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Glare Overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl z-20 pointer-events-none mix-blend-overlay opacity-30 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                x: glareX,
                y: glareY
              }}
            />
          </motion.div>
        </div>

        {/* Right: Lab Configurator UI */}
        <div className="relative z-10 flex flex-col space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#39ff14]" />
            <span className="text-xs font-mono text-white/80 uppercase tracking-widest">AURA Creator Studio</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Holographic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Lab Config</span>
          </h2>

          <p className="text-white/60 font-medium max-w-md">
            Experience next-generation footwear customization. Modify materials, view real-time Hype metrics, and co-create your perfect drop with AURA AI.
          </p>

          {/* Colorway Switcher */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider">Select Colorway</h3>
            <div className="flex space-x-4">
              {colorways.map((cw) => (
                <button
                  key={cw.id}
                  onClick={() => setActiveColorway(cw)}
                  className={`group relative w-16 h-16 rounded-xl border transition-all duration-300 overflow-hidden ${
                    activeColorway.id === cw.id 
                      ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : 'border-white/10 hover:border-white/50'
                  }`}
                >
                  <Image src={cw.image} alt={cw.name} fill className="object-cover scale-150" />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${activeColorway.id === cw.id ? 'opacity-0' : 'opacity-40 bg-black/50 group-hover:opacity-20'}`} />
                </button>
              ))}
            </div>
            <div className="text-lg font-bold text-white tracking-wide">{activeColorway.name}</div>
          </div>

          {/* Live Stats Board (Glassmorphic) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex flex-col items-center justify-center space-y-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-black text-white">{activeColorway.stats.hype}</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Hype Factor</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex flex-col items-center justify-center space-y-2">
              <Hexagon className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-black text-white">{activeColorway.stats.comfort}</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Comfort Idx</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex flex-col items-center justify-center space-y-2">
              <Fingerprint className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-white text-center leading-tight">{activeColorway.stats.rarity}</span>
              <span className="text-[10px] font-mono text-white/50 uppercase mt-1">Tier</span>
            </div>
          </div>

          {/* Premium CTA */}
          <button className="group relative w-full py-5 rounded-2xl overflow-hidden font-bold text-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]">
            {/* Animated Gradient Background */}
            <div 
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{ backgroundColor: activeColorway.accent }}
            />
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Co-Create with AURA</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
