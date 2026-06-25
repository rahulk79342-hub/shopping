"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '@/context/UIContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

// MOCK PRODUCT DATA FOR AURA SIMULATION
const auraProducts = [
  { id: '101', name: 'Nocturne Oversized Hoodie', price: 1200, category: 'Top', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80' },
  { id: '102', name: 'Obsidian Cargo Pants', price: 1500, category: 'Bottom', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80' },
  { id: '103', name: 'Neon-Stitch Sneakers', price: 2800, category: 'Shoes', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' },
  { id: '104', name: 'Cyberpunk Visor Shades', price: 850, category: 'Accessory', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
  
  { id: '201', name: 'Ivory Linen Resort Shirt', price: 1400, category: 'Top', image: 'https://images.unsplash.com/photo-1602810316425-048410bb8b15?auto=format&fit=crop&w=800&q=80' },
  { id: '202', name: 'Sandstone Tailored Trousers', price: 1800, category: 'Bottom', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80' },
  { id: '203', name: 'Suede Loafers', price: 2200, category: 'Shoes', image: 'https://images.unsplash.com/photo-1614252339460-e1f158914c9c?auto=format&fit=crop&w=800&q=80' },
  { id: '204', name: 'Gold Minimalist Watch', price: 3500, category: 'Accessory', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80' }
];

export default function AuraStylist() {
  const { isAuraOpen, closeAura, openCartDrawer } = useUI();
  const addToCart = useCartStore(state => state.addToCart);
  
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [vibe, setVibe] = useState('default'); // 'default', 'dark', 'light'

  // Ref to prevent scrolling when open
  useEffect(() => {
    if (isAuraOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state on close
      setTimeout(() => {
        setPrompt('');
        setResult(null);
        setVibe('default');
        setIsProcessing(false);
      }, 500);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isAuraOpen]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setResult(null);

    // Analyze prompt for Vibe
    const lowerPrompt = prompt.toLowerCase();
    let selectedVibe = 'default';
    let outfit = [];
    let explanation = '';

    if (lowerPrompt.includes('tokyo') || lowerPrompt.includes('dark') || lowerPrompt.includes('night') || lowerPrompt.includes('street')) {
      selectedVibe = 'dark';
      outfit = [auraProducts[0], auraProducts[1], auraProducts[2], auraProducts[3]];
      explanation = "I've curated a high-contrast, cyberpunk-inspired look perfectly suited for neon-lit streets. The Nocturne Hoodie provides an oversized, relaxed silhouette, balanced by the utilitarian Obsidian Cargo Pants. The neon-stitch sneakers add a crucial pop of visibility against the dark palette.";
    } else if (lowerPrompt.includes('summer') || lowerPrompt.includes('beach') || lowerPrompt.includes('resort') || lowerPrompt.includes('minimal')) {
      selectedVibe = 'light';
      outfit = [auraProducts[4], auraProducts[5], auraProducts[6], auraProducts[7]];
      explanation = "For a refined, minimalist aesthetic, I've selected breathable textures and earth tones. The Ivory Linen Shirt paired with Sandstone Trousers creates a seamless, elegant flow. The suede loafers ground the outfit, while the gold watch adds a subtle touch of stealth wealth.";
    } else {
      // Default / Random mix
      selectedVibe = 'dark';
      outfit = [auraProducts[0], auraProducts[5], auraProducts[2], auraProducts[7]];
      explanation = "I've built a versatile, high-low look that bridges streetwear and tailored precision. This combination offers unexpected contrast—pairing relaxed upper layers with structured bottoms for a truly modern silhouette.";
    }

    setVibe(selectedVibe);

    // Simulate AI processing time
    setTimeout(() => {
      setResult({ outfit, explanation });
      setIsProcessing(false);
    }, 2500);
  };

  const handleAcquireLook = () => {
    if (result && result.outfit) {
      result.outfit.forEach(item => {
        addToCart({ ...item, size: 'M' }); // Default to M for quick add
      });
      closeAura();
      openCartDrawer();
    }
  };

  const getVibeStyles = () => {
    switch (vibe) {
      case 'dark': return { bg: 'bg-[#050505]', text: 'text-white', border: 'border-white/10', accent: 'bg-white text-black' };
      case 'light': return { bg: 'bg-[#F2F0EB]', text: 'text-[#1A1A1A]', border: 'border-black/10', accent: 'bg-[#1A1A1A] text-white' };
      default: return { bg: 'bg-black/80 backdrop-blur-3xl', text: 'text-white', border: 'border-white/20', accent: 'bg-white text-black' };
    }
  };

  const styles = getVibeStyles();

  return (
    <AnimatePresence>
      {isAuraOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[200] ${styles.bg} transition-colors duration-1000 flex flex-col`}
        >
          {/* Header */}
          <header className={`p-6 flex justify-between items-center ${styles.text}`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] animate-pulse">auto_awesome</span>
              <span className="font-[var(--font-family-display-lg)] text-xl tracking-tighter uppercase font-bold">Aura Engine</span>
            </div>
            <button onClick={closeAura} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 pb-24">
            
            {!result ? (
              // PROMPT STATE
              <div className="h-full flex flex-col justify-center max-w-4xl mx-auto mt-[10vh]">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-tight ${styles.text}`}
                >
                  Describe your <span className="italic font-light">vision.</span><br/>Let AURA manifest it.
                </motion.h1>
                
                <form onSubmit={handleSubmit} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isProcessing ? 'animate-pulse opacity-75' : ''}`}></div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={isProcessing}
                      placeholder="e.g. Minimalist stealth-wealth for a flight to Tokyo..."
                      className={`w-full bg-black/50 backdrop-blur-md ${styles.text} text-xl md:text-2xl p-6 md:p-8 rounded-2xl border ${styles.border} focus:outline-none placeholder-white/30`}
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      disabled={isProcessing || !prompt.trim()}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 ${styles.accent} p-3 rounded-xl disabled:opacity-50 transition-all hover:scale-105`}
                    >
                      <span className="material-symbols-outlined text-[28px]">{isProcessing ? 'hourglass_empty' : 'arrow_upward'}</span>
                    </button>
                  </div>
                </form>

                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={`mt-12 flex items-center gap-4 ${styles.text}`}
                  >
                    <div className="flex gap-1">
                      {[1,2,3].map(i => (
                        <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-2 h-2 rounded-full bg-current" />
                      ))}
                    </div>
                    <span className="font-[var(--font-family-label-caps)] uppercase tracking-widest text-sm">Analyzing style matrix...</span>
                  </motion.div>
                )}
              </div>
            ) : (
              // RESULT STATE (BENTO GRID)
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto pt-8"
              >
                <div className="flex flex-col lg:flex-row gap-12">
                  
                  {/* Left: Text & Rationale */}
                  <div className={`w-full lg:w-1/3 flex flex-col ${styles.text}`}>
                    <h2 className="text-sm font-[var(--font-family-label-caps)] uppercase tracking-widest mb-4 opacity-60">Aura Curation</h2>
                    <h3 className="text-3xl font-bold mb-6 italic">"{prompt}"</h3>
                    
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                      className={`p-6 rounded-2xl border ${styles.border} bg-white/5 backdrop-blur-sm mb-8`}
                    >
                      <span className="material-symbols-outlined text-[20px] mb-4">psychology</span>
                      <p className="text-lg leading-relaxed">{result.explanation}</p>
                    </motion.div>

                    <button 
                      onClick={handleAcquireLook}
                      className={`w-full py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 ${styles.accent} hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl`}
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      Acquire Full Look — Rs. {result.outfit.reduce((acc, item) => acc + item.price, 0)}
                    </button>
                    
                    <button onClick={() => {setResult(null); setPrompt(''); setVibe('default');}} className="mt-4 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                      ← Generate Another
                    </button>
                  </div>

                  {/* Right: Bento Grid */}
                  <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                      
                      {/* Hero Item (usually top or jacket) */}
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
                        <Image src={result.outfit[0].image} fill alt={result.outfit[0].name} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{result.outfit[0].category}</p>
                          <p className="text-xl font-bold">{result.outfit[0].name}</p>
                          <p className="text-sm">Rs. {result.outfit[0].price}</p>
                        </div>
                      </motion.div>

                      {/* Item 2 */}
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group">
                        <Image src={result.outfit[1].image} fill alt={result.outfit[1].name} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-[8px] font-bold uppercase tracking-widest opacity-80">{result.outfit[1].category}</p>
                          <p className="text-sm font-bold truncate">{result.outfit[1].name}</p>
                        </div>
                      </motion.div>

                      {/* Item 3 */}
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group">
                        <Image src={result.outfit[2].image} fill alt={result.outfit[2].name} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-[8px] font-bold uppercase tracking-widest opacity-80">{result.outfit[2].category}</p>
                          <p className="text-sm font-bold truncate">{result.outfit[2].name}</p>
                        </div>
                      </motion.div>

                      {/* Item 4 */}
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }} className="col-span-2 md:col-span-3 row-span-1 relative rounded-3xl overflow-hidden group">
                        <Image src={result.outfit[3].image} fill alt={result.outfit[3].name} className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-6 text-white flex justify-between items-end w-[calc(100%-3rem)]">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{result.outfit[3].category}</p>
                            <p className="text-lg font-bold">{result.outfit[3].name}</p>
                          </div>
                          <span className="material-symbols-outlined bg-white text-black p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">add</span>
                        </div>
                      </motion.div>

                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
