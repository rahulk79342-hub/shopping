"use client";
<<<<<<< HEAD
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
=======
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

const SLIDES = [
  {
    id: 1,
<<<<<<< HEAD
    title: "Linen Shirts",
    subtitle: "Breathe Easy",
    imgDesktop: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000&auto=format&fit=crop",
    imgMobile: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    link: "/collections/linen-collections"
  },
  {
    id: 2,
    title: "Mercury Shirts",
    subtitle: "For Nights That Matter",
    imgDesktop: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=2000&auto=format&fit=crop",
    imgMobile: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop",
    link: "/collections/casuals"
=======
    type: "video",
    title: "The Summer Drop",
    subtitle: "NEW ARRIVALS",
    mediaDesktop: "https://videos.pexels.com/video-files/8467540/8467540-hd_1920_1080_25fps.mp4",
    mediaMobile: "https://videos.pexels.com/video-files/8467406/8467406-uhd_1440_2560_25fps.mp4",
    link: "/discover",
    hotspots: [
      {
        id: 'hs1',
        x: 65,
        y: 45,
        product: {
          name: "Signature Linen Shirt",
          price: "Rs. 1,499.00",
          image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
          link: "/product/1"
        }
      },
      {
        id: 'hs2',
        x: 40,
        y: 75,
        product: {
          name: "Classic Chino Trousers",
          price: "Rs. 1,899.00",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN",
          link: "/product/2"
        }
      }
    ]
  },
  {
    id: 2,
    type: "image",
    title: "Printed Shirts",
    subtitle: "MAKE A STATEMENT",
    mediaDesktop: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
    mediaMobile: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
    link: "/discover",
    hotspots: []
  },
  {
    id: 3,
    type: "image",
    title: "Old Money",
    subtitle: "TIMELESS ELEGANCE",
    mediaDesktop: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
    mediaMobile: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
    link: "/discover",
    hotspots: []
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
  }
];

export default function HeroCarousel() {
<<<<<<< HEAD
  const [currentSlide, setCurrentSlide] = useState(0);
=======
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, align: "center" },
    [Autoplay({ delay: 8000, stopOnInteraction: false })]
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
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

  const toggleHotspot = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveHotspot(prev => prev === id ? null : id);
  };

  return (
<<<<<<< HEAD
    <section className="w-full bg-white md:h-[600px] h-[500px] relative overflow-hidden">
      {/* Desktop: Full Width, Mobile: Card with edge hints (handled via overflow and snap) */}
      <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        {SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className="w-[90vw] md:w-full flex-shrink-0 snap-center h-full relative px-2 md:px-0"
          >
            <div className="w-full h-full relative rounded-2xl md:rounded-none overflow-hidden">
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.imgMobile} />
                <img 
                  src={slide.imgDesktop} 
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </picture>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-16 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <h2 className="text-white text-[40px] md:text-[64px] mb-2 shadow-sm font-serif" style={{ fontStyle: "italic" }}>
                  {slide.title}
                </h2>
                <p className="text-white text-[14px] md:text-[18px] mb-6 font-bold tracking-widest shadow-sm uppercase">
                  {slide.subtitle}
                </p>
                <Link 
                  href={slide.link}
                  className="bg-white text-black px-10 py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Shop Now
                </Link>
=======
    <section className="relative w-full overflow-hidden bg-[var(--color-background)] group pt-4 md:pt-8 pb-8 md:pb-12">
      <div className="overflow-hidden w-full h-[70vh] md:h-[80vh]" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y -ml-4 md:-ml-6">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_90%] md:flex-[0_0_65%] min-w-0 h-full pl-4 md:pl-6">
              <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm group/slide">
                
                {/* Media Layer */}
                {slide.type === 'video' ? (
                  <>
                    <video
                      src={slide.mediaDesktop}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="hidden md:block w-full h-full object-cover"
                    />
                    <video
                      src={slide.mediaMobile}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="block md:hidden w-full h-full object-cover"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={slide.mediaDesktop}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="hidden md:block object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 65vw"
                    />
                    <Image
                      src={slide.mediaMobile}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="block md:hidden object-cover object-center"
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
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots (Desktop mostly) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 hidden md:flex">
        {SLIDES.map((_, index) => (
          <button 
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => {
              const carousel = document.querySelector('.snap-x');
              if (carousel) {
                carousel.scrollTo({
                  left: index * carousel.clientWidth,
                  behavior: 'smooth'
                });
                setCurrentSlide(index);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
