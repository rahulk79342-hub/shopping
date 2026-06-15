"use client";
<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useRecentStore } from "@/store/useRecentStore";
import { MdOutlineNorthEast } from 'react-icons/md';

=======
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import ProductCard from '@/components/ProductCard';
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

export default function RecentlyViewed() {
  const viewedItems = useRecentlyViewedStore(state => state.viewedItems);
  const [mounted, setMounted] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || viewedItems.length === 0) return null;

  return (
<<<<<<< HEAD
    <section className="w-full py-8 md:py-12 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4 touch-pan-y">
            {recentProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex-[0_0_35%] sm:flex-[0_0_25%] md:flex-[0_0_15%] lg:flex-[0_0_12%] min-w-0 pl-4"
              >
                <Link href={`/product/${product.id}`} className="block group w-full">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-[20px] md:rounded-[24px] mb-3">
                    <Image 
                      src={product.image || '/placeholder-image.jpg'} 
                      alt={product.name || 'Product'}
                      fill
                      sizes="(max-width: 768px) 35vw, 15vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2 overflow-hidden">
                      <h3 className="font-bold text-[13px] md:text-[14px] text-black truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className={`text-[11px] md:text-[12px] ${product.sale ? 'text-[var(--color-sale-red)]' : 'text-gray-500'} truncate`}>
                          Rs. {product.price?.toLocaleString('en-IN') || product.price}
                        </p>
                        {product.originalPrice && (
                          <p className="text-[10px] md:text-[11px] text-gray-400 line-through truncate">
                            Rs. {product.originalPrice.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-gray-800 transition-colors shadow-md">
                      <MdOutlineNorthEast className="text-[14px] md:text-[16px]" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
=======
    <>
      {/* DESKTOP VIEW: Standard in-page row */}
      <section className="hidden md:block w-full px-4 py-16 max-w-screen-2xl mx-auto bg-white border-b border-gray-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="font-bold text-[10px] uppercase tracking-widest text-gray-500 mb-2 block flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">history</span>
              Welcome Back
            </span>
            <h2 className="text-[32px] font-bold text-black tracking-tighter leading-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Pick up where you left off
            </h2>
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
          </div>
          <Link href="/account/history" className="text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
            View All History
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-4">
          {viewedItems.map((product) => (
             <div key={product.id} className="min-w-[280px] flex-1 snap-start">
               <ProductCard product={product} />
             </div>
          ))}
        </div>
      </section>

      {/* MOBILE VIEW: Sticky collapsible bottom bar */}
      <div className="md:hidden">
        <AnimatePresence>
          {!isMobileExpanded ? (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] px-4 py-3 pb-8 rounded-t-2xl flex flex-col cursor-pointer"
              onClick={() => setIsMobileExpanded(true)}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y < -20) setIsMobileExpanded(true); // Swipe up
              }}
            >
              {/* Drag Handle Indicator */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <span className="font-bold text-[12px] uppercase tracking-widest text-black">Recently Viewed</span>
                   <div className="flex -space-x-2">
                     {viewedItems.slice(0, 3).map((item, i) => (
                       <div key={item.id} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white bg-gray-100 relative shadow-sm" style={{ zIndex: 10 - i }}>
                          <Image src={item.img || item.imageUrl} fill sizes="28px" className="object-cover" alt="" />
                       </div>
                     ))}
                   </div>
                </div>
                
                <span className="material-symbols-outlined text-gray-400 text-[20px] animate-bounce">expand_less</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end"
            >
               <div className="absolute inset-0" onClick={() => setIsMobileExpanded(false)}></div>
               
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%" }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 className="w-full bg-white rounded-t-[32px] pb-10 flex flex-col relative z-10 max-h-[85vh] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
                 drag="y"
                 dragControls={dragControls}
                 dragConstraints={{ top: 0, bottom: 0 }}
                 dragElastic={0.2}
                 onDragEnd={(e, info) => {
                   if (info.offset.y > 50) setIsMobileExpanded(false); // Swipe down
                 }}
               >
                 {/* Draggable Header */}
                 <div 
                   className="w-full pt-6 pb-4 px-6 flex flex-col items-center justify-center border-b border-gray-100 touch-none cursor-grab active:cursor-grabbing"
                   onPointerDown={(e) => dragControls.start(e)}
                 >
                   <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-5"></div>
                   <h3 className="font-bold text-[20px] text-black tracking-tight">Welcome Back</h3>
                   <p className="text-gray-500 text-[13px] mt-1">Pick up right where you left off.</p>
                   
                   <button 
                     onClick={() => setIsMobileExpanded(false)} 
                     className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-black"
                   >
                     <span className="material-symbols-outlined text-[18px]">expand_more</span>
                   </button>
                 </div>

                 {/* Horizontally scrolling products */}
                 <div className="w-full overflow-x-auto flex gap-4 p-6 snap-x snap-mandatory hide-scrollbar">
                    {viewedItems.map((product) => (
                       <div key={product.id} className="min-w-[75vw] snap-center">
                         <ProductCard product={product} />
                       </div>
                    ))}
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
