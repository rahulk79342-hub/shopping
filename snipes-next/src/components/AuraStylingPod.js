"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MdOutlineAutoAwesome, MdOutlineSearch } from 'react-icons/md';

const prompts = [
  "Cyberpunk Tokyo Night",
  "Minimalist Utility Gear",
  "High-Fashion Gorpcore"
];

const mockOutfits = {
  "Cyberpunk Tokyo Night": [
    { id: 1, name: "Neon Matrix Jacket", price: "$299", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { id: 2, name: "Carbon Fiber Cargos", price: "$185", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400" },
    { id: 3, name: "Y3-Inspired Runners", price: "$320", image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=400" }
  ],
  "Minimalist Utility Gear": [
    { id: 4, name: "Tech-Fleece Zip", price: "$150", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" },
    { id: 5, name: "Structured Parachute Pants", price: "$120", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=400" }
  ],
  "High-Fashion Gorpcore": [
    { id: 6, name: "Gore-Tex Shell", price: "$450", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400" },
    { id: 7, name: "All-Terrain Boots", price: "$280", image: "https://images.unsplash.com/photo-1523398002811-999aa8e9dd20?q=80&w=400" }
  ]
};

export default function AuraStylingPod() {
  const [activePrompt, setActivePrompt] = useState("");
  const [status, setStatus] = useState("idle"); // idle, typing, processing, complete
  const [displayedText, setDisplayedText] = useState("");

  const handlePromptClick = (prompt) => {
    if (status !== "idle" && status !== "complete") return;
    setActivePrompt(prompt);
    setStatus("typing");
    setDisplayedText("");
  };

  useEffect(() => {
    if (status === "typing") {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(activePrompt.slice(0, i + 1));
        i++;
        if (i >= activePrompt.length) {
          clearInterval(interval);
          setTimeout(() => setStatus("processing"), 500);
        }
      }, 50);
      return () => clearInterval(interval);
    }
    
    if (status === "processing") {
      const timeout = setTimeout(() => {
        setStatus("complete");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, activePrompt]);

  return (
    <section className="relative w-full py-24 bg-[#020202] overflow-hidden flex flex-col items-center">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <MdOutlineAutoAwesome className="text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Aura AI Generator</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-4">
            Generative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Styling Pod</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Input a vibe, and let our neural network construct the perfect silhouette.
          </p>
        </div>

        {/* Interaction Pod */}
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-[32px] p-6 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.1)] backdrop-blur-xl relative overflow-hidden">
          
          {/* Scanning Line Effect */}
          {status === "processing" && (
            <motion.div 
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] z-20 pointer-events-none"
            />
          )}

          {/* Search Input Area */}
          <div className="relative w-full max-w-2xl mx-auto mb-10">
            <div className={`w-full h-16 rounded-full border flex items-center px-6 transition-colors duration-500 bg-black/50 ${
              status === "processing" ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]" : "border-white/20"
            }`}>
              <MdOutlineSearch className={`text-2xl mr-4 ${status === "processing" ? "text-purple-400" : "text-gray-500"}`} />
              <div className="flex-1 font-mono text-lg text-white">
                {displayedText}
                {(status === "typing" || status === "idle") && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-5 bg-purple-500 ml-1 translate-y-1"
                  />
                )}
                {status === "idle" && !displayedText && <span className="text-gray-600">Select a prompt below...</span>}
              </div>
            </div>
          </div>

          {/* Prompt Chips */}
          {(status === "idle" || status === "complete") && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-all hover:border-purple-500/50"
                >
                  {prompt}
                </button>
              ))}
            </motion.div>
          )}

          {/* Processing State */}
          {status === "processing" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-6" />
              <p className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase animate-pulse">Compiling Lookbook...</p>
            </div>
          )}

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {status === "complete" && activePrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {mockOutfits[activePrompt]?.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-white/10 cursor-pointer"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Aura Match</p>
                      <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-white font-mono">{item.price}</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-white text-black px-3 py-1 rounded-full">Add</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
