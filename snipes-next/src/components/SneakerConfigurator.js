"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MdOutlineSpeed, MdOutlineAir, MdOutlineLayers, MdOutlineSettingsInputComponent } from 'react-icons/md';

const nodes = [
  {
    id: "upper",
    label: "Primeknit Upper",
    desc: "Adaptive ultra-lightweight mesh providing seamless support.",
    x: "35%",
    y: "30%",
    icon: <MdOutlineLayers />
  },
  {
    id: "midsole",
    label: "Aura Boost Tech",
    desc: "Energy-returning foam midsole for maximum shock absorption.",
    x: "50%",
    y: "80%",
    icon: <MdOutlineSpeed />
  },
  {
    id: "heel",
    label: "Carbon Heel Clip",
    desc: "Rigid carbon-fiber heel counter for locked-in stability.",
    x: "85%",
    y: "55%",
    icon: <MdOutlineSettingsInputComponent />
  },
  {
    id: "toe",
    label: "Reinforced Toe Guard",
    desc: "Abrasion-resistant overlay protecting against high-impact elements.",
    x: "15%",
    y: "65%",
    icon: <MdOutlineAir />
  }
];

export default function SneakerConfigurator() {
  const [activeNode, setActiveNode] = useState(nodes[0]);

  return (
    <section className="relative w-full py-32 bg-[#020202] overflow-hidden flex items-center justify-center min-h-screen">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#0a0a0a] to-[#020202] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: 3D Sneaker Showcase */}
        <div className="w-full lg:w-2/3 relative h-[500px] md:h-[700px] flex items-center justify-center">
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[800px] aspect-[16/9] z-10 drop-shadow-[0_40px_60px_rgba(0,255,255,0.2)]"
          >
            {/* Main Sneaker Image (Transparent PNG ideal, using unsplash as placeholder) */}
            <Image 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" 
              alt="Aura Sneaker Profile" 
              fill 
              className="object-contain filter brightness-110 contrast-125 saturate-150 rounded-[40px] mix-blend-lighten"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />
            
            {/* Interactive Nodes */}
            {nodes.map((node) => (
              <div 
                key={node.id}
                className="absolute z-20 group"
                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveNode(node)}
              >
                {/* Node Core */}
                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${activeNode.id === node.id ? 'bg-[#00ffff] scale-125' : 'bg-white/20 hover:bg-[#00ffff]/50'}`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                  
                  {/* Outer Rings */}
                  {activeNode.id === node.id && (
                    <>
                      <div className="absolute inset-0 rounded-full border border-[#00ffff] animate-ping opacity-75" />
                      <div className="absolute -inset-2 rounded-full border border-[#00ffff]/30" />
                    </>
                  )}
                </div>
                
                {/* Connecting Line (Simulated) */}
                {activeNode.id === node.id && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute top-1/2 left-full w-16 h-[1px] bg-[#00ffff] origin-left pointer-events-none hidden md:block"
                  />
                )}
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Side: Tech Specs Panel */}
        <div className="w-full lg:w-1/3 mt-16 lg:mt-0 relative">
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse" />
            <span className="text-[#00ffff] font-mono text-xs tracking-widest uppercase">Laboratory Data</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12">
            Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-blue-500">Runner X</span>
          </h2>

          <div className="relative h-[250px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#0a0a0a] border border-[#00ffff]/20 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.1)]"
              >
                <div className="w-12 h-12 rounded-full bg-[#00ffff]/10 flex items-center justify-center text-[#00ffff] text-2xl mb-6">
                  {activeNode.icon}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">{activeNode.label}</h3>
                <div className="w-12 h-[2px] bg-[#00ffff] mb-4" />
                <p className="text-gray-400 font-mono text-sm leading-relaxed">{activeNode.desc}</p>
                
                <div className="mt-8 flex justify-between items-center text-xs font-mono text-[#00ffff]/60 uppercase tracking-widest">
                  <span>Status: Active</span>
                  <span>Mod: +{Math.floor(Math.random() * 50)}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="mt-8 w-full py-5 bg-transparent border border-[#00ffff]/50 text-[#00ffff] font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#00ffff] hover:text-black transition-colors shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]">
            Open Configurator
          </button>
        </div>

      </div>
    </section>
  );
}
