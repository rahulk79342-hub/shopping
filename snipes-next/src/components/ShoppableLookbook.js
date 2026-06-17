"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/useWishlistStore';
import Link from 'next/link';

const MOCK_LOOKBOOK = {
  heroImage: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1600&q=80',
  title: 'The Modern Tailoring',
  editorial: 'Built for the commute. Worn on the weekend. Discover the new standard in premium menswear.',
  hotspots: [
    {
      id: 'hs1',
      x: 82, // percentage from left (beige blazer on the right)
      y: 50, // percentage from top
      product: {
        id: '1',
        name: 'Signature Wool Blazer',
        price: '₹4,499',
        img: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80'
      }
    },
    {
      id: 'hs2',
      x: 18, // percentage from left (blue pants on the left)
      y: 65,
      product: {
        id: '2',
        name: 'Pleated Dress Trousers',
        price: '₹2,499',
        img: '/image.png'
      }
    }
  ]
};

export default function ShoppableLookbook() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);
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

  const handleWishlist = (productId, e) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const activeProductData = MOCK_LOOKBOOK.hotspots.find(h => h.id === activeHotspot);

  return (
    <section className="relative w-full h-[85vh] md:h-[100vh] min-h-[600px] overflow-hidden bg-[#050505] group" ref={containerRef}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={MOCK_LOOKBOOK.heroImage}
          fill
          sizes="100vw"
          className="object-cover object-top md:object-[center_15%] transition-transform duration-[1.5s] group-hover:scale-[1.02]"
          alt="Lookbook Editorial"
          priority
        />
        {/* Subtle gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 mix-blend-multiply" />
      </div>

      {/* Editorial Content */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-16 z-10 pointer-events-none text-white">
        <div className="max-w-xl">
          <span className="font-bold text-[10px] md:text-[12px] uppercase tracking-[0.2em] mb-4 block text-white/80">Campaign — Summer '26</span>
          <h2 className="text-[40px] md:text-[72px] leading-[0.9] font-bold tracking-tighter mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            {MOCK_LOOKBOOK.title}
          </h2>
          <p className="text-[16px] md:text-[18px] font-medium leading-relaxed text-white/90 max-w-md">
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
            className={`absolute ${isActive ? 'z-40' : 'z-20'}`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            {/* The Dot Indicator */}
            <div className="relative group/dot cursor-pointer flex items-center justify-center w-8 h-8 -ml-4 -mt-4" onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white rounded-full"
              />
              <div className={`relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isActive ? 'scale-150' : 'group-hover/dot:scale-150'}`} />
            </div>

            {/* Desktop Popover Product Card */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="hidden md:block absolute bottom-12 left-12 w-[220px] bg-white rounded-sm overflow-hidden shadow-2xl cursor-default border border-gray-100"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                    className="absolute top-2 right-2 z-30 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 text-black transition-colors border border-gray-200"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>

                  <div className="relative w-full aspect-[4/5] bg-gray-100 group/img">
                    <Image src={hotspot.product.img} fill className="object-cover" alt={hotspot.product.name} />
                    
                    <button
                      onClick={(e) => handleWishlist(hotspot.product.id, e)}
                      className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm z-20 border border-gray-100"
                    >
                      <span className={`material-symbols-outlined text-[14px] transition-colors ${wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-black'}`} style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                    </button>
                  </div>

                  <div className="p-4 bg-white">
                    <h4 className="font-bold text-[13px] text-black leading-tight mb-1 truncate">{hotspot.product.name}</h4>
                    <p className="text-[13px] text-gray-500 font-medium mb-4">{hotspot.product.price}</p>
                    <Link
                      href={`/product/${hotspot.product.id}`}
                      className="w-full bg-black text-white font-bold text-[10px] py-3 rounded-none uppercase tracking-widest hover:bg-[#222] transition-colors flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Mobile Popover Product Card (Centered) */}
      <AnimatePresence>
        {activeProductData && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] bg-white rounded-sm overflow-hidden shadow-2xl cursor-default border border-gray-100 z-40"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
              className="absolute top-2 right-2 z-30 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 text-black transition-colors border border-gray-200"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>

            <div className="relative w-full aspect-[4/5] bg-gray-100 group/img">
              <Image src={activeProductData.product.img} fill className="object-cover" alt={activeProductData.product.name} />
              
              <button
                onClick={(e) => handleWishlist(activeProductData.product.id, e)}
                className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm z-20 border border-gray-100"
              >
                <span className={`material-symbols-outlined text-[16px] transition-colors ${isInWishlist(activeProductData.product.id) ? 'text-red-500' : 'text-gray-400 hover:text-black'}`} style={{ fontVariationSettings: isInWishlist(activeProductData.product.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              </button>
            </div>

            <div className="p-4 bg-white">
              <h4 className="font-bold text-[15px] text-black leading-tight mb-1 truncate">{activeProductData.product.name}</h4>
              <p className="text-[14px] text-gray-500 font-medium mb-4">{activeProductData.product.price}</p>
              <Link
                href={`/product/${activeProductData.product.id}`}
                className="w-full bg-black text-white font-bold text-[12px] py-4 rounded-none uppercase tracking-widest hover:bg-[#222] transition-colors flex items-center justify-center"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explore Button (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Link href="/collections/modern-tailoring" className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-none hover:bg-gray-200 transition-colors duration-300">
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
