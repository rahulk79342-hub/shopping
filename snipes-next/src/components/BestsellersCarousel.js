"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export default function BestsellersCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false, dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-32 overflow-hidden bg-[var(--color-surface-container-low)]">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-[var(--color-outline-variant)] pb-8 gap-6">
          <div>
            <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-[0.3em] block mb-2">Most Wanted</span>
            <h2 className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[56px] text-[var(--color-primary)] leading-none tracking-tight">
              Bestsellers
            </h2>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`w-12 h-12 flex items-center justify-center border border-[var(--color-outline-variant)] rounded-full transition-all duration-300 ${!prevBtnEnabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] cursor-pointer'}`}
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button 
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`w-12 h-12 flex items-center justify-center border border-[var(--color-outline-variant)] rounded-full transition-all duration-300 ${!nextBtnEnabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] cursor-pointer'}`}
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-8 touch-pan-y">
            {products.map((product, index) => (
              <div 
                key={product._id || index} 
                className="flex-[0_0_80%] min-w-0 md:flex-[0_0_35%] lg:flex-[0_0_28%] pl-4 md:pl-8"
              >
                <div className="relative group flex flex-col h-full">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)] mb-6">
                    <Link href={`/product/${product.slug?.current || product._id}`} className="block w-full h-full">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 35vw, 28vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                    
                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <button className="w-full bg-[var(--color-background)] text-[var(--color-primary)] font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest py-4 hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors duration-300 shadow-lg cursor-pointer">
                        Quick Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link href={`/product/${product.slug?.current || product._id}`}>
                      <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] hover:text-[var(--color-outline)] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-[var(--font-family-body-md)] text-[14px] text-[var(--color-outline)]">
                      Rs. {product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
