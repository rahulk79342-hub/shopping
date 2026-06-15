"use client";
import { useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineSwapVert } from 'react-icons/md';


export default function OutfitBuilder({ data }) {
  const [topRef, topApi] = useEmblaCarousel({ axis: 'x', loop: true });
  const [bottomRef, bottomApi] = useEmblaCarousel({ axis: 'x', loop: true });
  
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);

  const onTopSelect = useCallback(() => {
    if (!topApi) return;
    setSelectedTopIndex(topApi.selectedScrollSnap());
  }, [topApi]);

  const onBottomSelect = useCallback(() => {
    if (!bottomApi) return;
    setSelectedBottomIndex(bottomApi.selectedScrollSnap());
  }, [bottomApi]);

  useState(() => {
    if (topApi) topApi.on('select', onTopSelect);
    if (bottomApi) bottomApi.on('select', onBottomSelect);
  }, [topApi, bottomApi, onTopSelect, onBottomSelect]);

  const scrollPrevTop = useCallback(() => topApi && topApi.scrollPrev(), [topApi]);
  const scrollNextTop = useCallback(() => topApi && topApi.scrollNext(), [topApi]);
  const scrollPrevBottom = useCallback(() => bottomApi && bottomApi.scrollPrev(), [bottomApi]);
  const scrollNextBottom = useCallback(() => bottomApi && bottomApi.scrollNext(), [bottomApi]);

  return (
    <section className="w-full bg-[var(--color-surface-container-low)] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12 text-center mb-16">
        <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-[0.3em] block mb-4">
          Interactive Lookbook
        </span>
        <h2 className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[48px] text-[var(--color-primary)] mb-6 tracking-tight">
          Mix & Match
        </h2>
        <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] max-w-md mx-auto text-sm">
          Swipe left or right on the tops and bottoms to build your perfect silhouette.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 w-full max-w-sm mx-auto relative px-12 md:px-0">
        
        {/* Tops Carousel */}
        <div className="relative w-full aspect-square bg-[var(--color-surface-container)] rounded-t-3xl overflow-hidden group">
          <div className="overflow-hidden w-full h-full cursor-grab active:cursor-grabbing" ref={topRef}>
            <div className="flex w-full h-full touch-pan-x">
              {data.tops.map((top, idx) => (
                <div key={top.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image 
                    src={top.image} 
                    alt={top.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-center font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest">{top.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrevTop} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity md:hidden group-hover:md:flex shadow-sm active:scale-95">
            <MdOutlineChevronLeft className="text-[18px]" />
          </button>
          <button onClick={scrollNextTop} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity md:hidden group-hover:md:flex shadow-sm active:scale-95">
            <MdOutlineChevronRight className="text-[18px]" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center py-2 relative z-10 -my-4 pointer-events-none">
          <div className="bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-[var(--color-background)]">
            <MdOutlineSwapVert className="text-[16px]" />
          </div>
        </div>

        {/* Bottoms Carousel */}
        <div className="relative w-full aspect-[4/5] bg-[var(--color-surface-container)] rounded-b-3xl overflow-hidden group">
          <div className="overflow-hidden w-full h-full cursor-grab active:cursor-grabbing" ref={bottomRef}>
            <div className="flex w-full h-full touch-pan-x">
              {data.bottoms.map((bottom, idx) => (
                <div key={bottom.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image 
                    src={bottom.image} 
                    alt={bottom.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-bottom" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-center font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest">{bottom.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrevBottom} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity md:hidden group-hover:md:flex shadow-sm active:scale-95">
            <MdOutlineChevronLeft className="text-[18px]" />
          </button>
          <button onClick={scrollNextBottom} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity md:hidden group-hover:md:flex shadow-sm active:scale-95">
            <MdOutlineChevronRight className="text-[18px]" />
          </button>
        </div>

        <button className="mt-8 w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 rounded-full active:scale-95 transition-transform hover:bg-[var(--color-secondary)] hover:text-black cursor-pointer shadow-xl">
          Shop This Look
        </button>

      </div>
    </section>
  );
}
