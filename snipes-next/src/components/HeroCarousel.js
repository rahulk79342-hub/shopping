"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { motion, AnimatePresence } from "framer-motion";

import { categorizedImages } from '@/lib/supabase';

const HERO_SLIDES = [
  {
    id: 1,
    type: "image",
    title: "Linen Shirts",
    subtitle: "BREATHE EASY",
    mediaDesktop: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  },
  {
    id: 2,
    type: "image",
    title: "Streetwear T-Shirts",
    subtitle: "URBAN ESSENTIALS",
    mediaDesktop: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  },
  {
    id: 3,
    type: "image",
    title: "Designer Shirts",
    subtitle: "ELEVATE YOUR STYLE",
    mediaDesktop: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  },
  {
    id: 4,
    type: "image",
    title: "Old Money",
    subtitle: "TIMELESS ELEGANCE",
    mediaDesktop: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  },
  {
    id: 5,
    type: "image",
    title: "The Summer Drop",
    subtitle: "NEW ARRIVALS",
    mediaDesktop: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  },
  {
    id: 6,
    type: "image",
    title: "Essential Tops",
    subtitle: "EVERYDAY COMFORT",
    mediaDesktop: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80",
    mediaMobile: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
    link: "/discover",
    hotspots: []
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, align: "center", dragFree: true },
    [
      Autoplay({ delay: 8000, stopOnInteraction: false }),
      WheelGesturesPlugin()
    ]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setActiveHotspot(null); // Close hotspot on slide change
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const toggleHotspot = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveHotspot(prev => prev === id ? null : id);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-background)] group pt-4 md:pt-8 pb-8 md:pb-12">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full touch-pan-y -ml-4 md:-ml-8 xl:-ml-12 items-center">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_80%] md:flex-[0_0_65%] min-w-0 pl-4 md:pl-8 xl:pl-12 select-none">
              <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[80vh] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm group/slide">
                
                {/* Media Layer */}
                {slide.type === 'video' ? (
                  <>
                    <video
                      src={slide.mediaDesktop}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="hidden md:block w-full h-full object-cover pointer-events-none"
                    />
                    <video
                      src={slide.mediaMobile}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="block md:hidden w-full h-full object-cover pointer-events-none"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={slide.mediaDesktop}
                      alt={slide.title}
                      fill
                      priority={true}
                      draggable={false}
                      className="hidden md:block object-cover object-[center_15%] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 65vw"
                    />
                    <Image
                      src={slide.mediaMobile}
                      alt={slide.title}
                      fill
                      priority={true}
                      draggable={false}
                      className="block md:hidden object-cover object-top pointer-events-none"
                      sizes="(max-width: 768px) 90vw, 100vw"
                    />
                  </>
                )}

                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 md:bg-black/10 z-0 transition-opacity"></div>
                
                {/* Content Layer */}
                <div className="absolute inset-0 flex flex-col justify-start items-center md:items-start text-center md:text-left pt-12 md:pt-16 px-8 z-10 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <h2 className="text-[36px] md:text-[56px] text-white leading-[1.1] mb-2 drop-shadow-md" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                      {slide.title}
                    </h2>
                    <span className="font-[var(--font-family-label-caps)] text-[12px] md:text-[14px] text-white/90 uppercase tracking-[0.2em] block font-bold drop-shadow-md">
                      {slide.subtitle}
                    </span>
                    <Link href={slide.link} className="inline-block mt-6 px-8 py-3 bg-white text-black font-bold text-[12px] uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-colors pointer-events-auto">
                      Shop Now
                    </Link>
                  </motion.div>
                </div>

                {/* Hotspots Layer */}
                {slide.hotspots && slide.hotspots.length > 0 && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {slide.hotspots.map(hotspot => (
                       <div 
                         key={hotspot.id} 
                         className="absolute pointer-events-auto"
                         style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                       >
                         {/* Pulsing Dot */}
                         <button 
                           onClick={(e) => toggleHotspot(e, hotspot.id)}
                           className="relative w-6 h-6 -ml-3 -mt-3 flex items-center justify-center group"
                           aria-label="View product"
                         >
                           <span className="absolute w-full h-full bg-white rounded-full opacity-40 animate-ping"></span>
                           <span className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] border-2 border-white group-hover:scale-125 transition-transform"></span>
                         </button>

                         {/* Product Card Popover */}
                         <AnimatePresence>
                           {activeHotspot === hotspot.id && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10, scale: 0.95 }}
                               animate={{ opacity: 1, y: 0, scale: 1 }}
                               exit={{ opacity: 0, y: 10, scale: 0.95 }}
                               className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 border border-white/20"
                             >
                               {/* Triangle pointer */}
                               <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-white/20"></div>
                               
                               <Link href={hotspot.product.link} className="flex flex-col gap-3 relative z-10 group/card">
                                 <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                                   <Image src={hotspot.product.image} fill className="object-cover group-hover/card:scale-110 transition-transform duration-500" alt={hotspot.product.name} />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-[12px] font-bold text-black leading-tight mb-1">{hotspot.product.name}</p>
                                    <p className="text-[12px] font-medium text-gray-600">{hotspot.product.price}</p>
                                 </div>
                               </Link>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows and Dots Below Slider */}
      <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
        <button 
          onClick={scrollPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-black hover:border-black transition-colors bg-white shadow-sm"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        <div className="flex justify-center gap-2 items-center">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex 
                  ? "w-8 h-1.5 bg-black" 
                  : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={scrollNext}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-black hover:border-black transition-colors bg-white shadow-sm"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
