"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useRecentStore } from "@/store/useRecentStore";
import { MdOutlineNorthEast } from 'react-icons/md';


export default function RecentlyViewed() {
  const { recentProducts } = useRecentStore();
  const [mounted, setMounted] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });
  
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
    setMounted(true);
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Hydration safety: don't render until mounted, and only if items exist
  if (!mounted || !recentProducts || recentProducts.length === 0) return null;

  return (
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
          </div>
        </div>
        
      </div>
    </section>
  );
}
