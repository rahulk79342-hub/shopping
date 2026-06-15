"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '@/context/UIContext';
import { useWishlistStore } from '@/store/useWishlistStore';

const MOCK_LOOKBOOK = {
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW',
  title: 'The Modern Tailoring',
  editorial: 'Built for the commute. Worn on the weekend. Discover the new standard in premium menswear.',
  hotspots: [
    {
      id: 'hs1',
      x: 42, // percentage from left
      y: 35, // percentage from top
      product: {
        id: '1',
        name: 'Motorsport Oversized Hoodie',
        price: '₹2,499',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW'
      }
    },
    {
      id: 'hs2',
      x: 58,
      y: 70,
      product: {
        id: '2',
        name: 'Charcoal Gurkha Pants',
        price: '₹1,499',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN'
      }
    }
  ]
};

export default function ShoppableLookbook() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);
  const { openQuickAdd } = useUI();
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeHotspot && containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveHotspot(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeHotspot]);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    openQuickAdd(product);
  };

  const handleWishlist = (productId, e) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[100vh] min-h-[600px] overflow-hidden bg-black group" ref={containerRef}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={MOCK_LOOKBOOK.heroImage}
          fill
          sizes="100vw"
          className="object-cover object-center md:object-top transition-transform duration-[1.5s] group-hover:scale-105"
          alt="Lookbook Editorial"
          priority
        />
        {/* Subtle gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 mix-blend-multiply" />
      </div>

      {/* Editorial Content */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-16 z-10 pointer-events-none text-white">
        <div className="max-w-xl">
           <span className="font-bold text-[10px] md:text-[12px] uppercase tracking-[0.2em] mb-4 block opacity-80">Campaign — Summer '26</span>
           <h2 className="text-[40px] md:text-[72px] leading-[0.9] font-bold tracking-tighter mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
             {MOCK_LOOKBOOK.title}
           </h2>
           <p className="text-[16px] md:text-[20px] font-medium leading-relaxed opacity-90 max-w-md shadow-sm">
             {MOCK_LOOKBOOK.editorial}
           </p>
        </div>
      </div>

      {/* Hotspots */}
      {MOCK_LOOKBOOK.hotspots.map((hotspot) => {
        const isActive = activeHotspot === hotspot.id;
        const wishlisted = isInWishlist(hotspot.product.id);

        return (
          <div 
            key={hotspot.id} 
            className="absolute z-20"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            {/* The Dot Indicator */}
            <div className="relative group/dot cursor-pointer" onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}>
              <div className="absolute -inset-4 bg-transparent" /> {/* Larger hit area */}
              
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white rounded-full blur-[4px]"
              />
              <div className={`relative w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isActive ? 'scale-125' : 'group-hover/dot:scale-125'}`}>
                {/* Inner dot */}
                <div className="absolute inset-1 bg-black rounded-full opacity-20" />
              </div>
            </div>

            {/* Popover Product Card */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-1/2 -translate-x-1/2 top-8 md:top-auto md:bottom-8 md:left-8 md:translate-x-0 w-[240px] bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl p-2 cursor-default"
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                    className="absolute top-3 right-3 z-30 w-6 h-6 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-gray-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>

                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image src={hotspot.product.img} fill className="object-cover" alt={hotspot.product.name} />
                    
                    {/* Wishlist Heart */}
                    <button 
                      onClick={(e) => handleWishlist(hotspot.product.id, e)}
                      className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm z-20"
                    >
                       <span className={`material-symbols-outlined text-[16px] transition-colors ${wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-black'}`} style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                    </button>
                  </div>

                  <div className="px-2 pb-2">
                    <h4 className="font-bold text-[13px] text-black leading-tight mb-1">{hotspot.product.name}</h4>
                    <p className="text-[13px] text-gray-600 font-medium mb-3">{hotspot.product.price}</p>
                    <button 
                      onClick={(e) => handleQuickAdd(hotspot.product, e)}
                      className="w-full bg-black text-white font-bold text-[11px] py-2.5 rounded-full uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                    >
                      Quick Add
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Explore Button (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
         <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-[12px] rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
           Explore Collection
         </button>
      </div>
    </section>
  );
}
