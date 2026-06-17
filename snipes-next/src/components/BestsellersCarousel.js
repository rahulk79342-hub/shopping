"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

export default function BestsellersCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false, dragFree: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('bestsellers');

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Re-init carousel when tab changes to reset position
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0, true);
    }
  }, [activeTab, emblaApi]);

  if (!products || products.length === 0) return null;

  // Simulate different data for "New Arrivals"
  const displayProducts = activeTab === 'bestsellers' ? products : [...products].reverse();

  return (
    <section className="w-full py-12 md:py-20 overflow-hidden bg-[var(--color-surface-container-low)]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12">

        {/* Header with Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 border-b border-gray-200 pb-6 gap-6">
          <div className="flex gap-6 md:gap-10">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`text-[24px] md:text-[40px] tracking-tight leading-none transition-colors duration-300 ${activeTab === 'bestsellers' ? 'text-black font-bold' : 'text-gray-400 font-medium hover:text-gray-600'}`}
              style={{ fontFamily: activeTab === 'bestsellers' ? "Georgia, serif" : "inherit", fontStyle: activeTab === 'bestsellers' ? "italic" : "normal" }}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`text-[24px] md:text-[40px] tracking-tight leading-none transition-colors duration-300 ${activeTab === 'newArrivals' ? 'text-black font-bold' : 'text-gray-400 font-medium hover:text-gray-600'}`}
              style={{ fontFamily: activeTab === 'newArrivals' ? "Georgia, serif" : "inherit", fontStyle: activeTab === 'newArrivals' ? "italic" : "normal" }}
            >
              New Arrivals
            </button>
          </div>

          {/* Custom Navigation */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex -ml-4 md:-ml-8 touch-pan-y"
            >
              {displayProducts.map((product, index) => (
                <div
                  key={product._id || index}
                  className="flex-[0_0_85%] min-w-0 md:flex-[0_0_35%] lg:flex-[0_0_28%] pl-4 md:pl-8"
                >
                  <div className="relative group flex flex-col h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-5 rounded-[16px]">
                      <Link href={`/product/${product.slug?.current || product._id}`} className="block w-full h-full relative">
                        <Image
                          src={product.imageUrl || "https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=800&q=80"}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 35vw, 28vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </Link>

                      {/* Rank Badge (#1 Best Seller) */}
                      {activeTab === 'bestsellers' && index === 0 && (
                        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-xl z-10">
                          <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                          #1 Best Seller this week
                        </div>
                      )}


                    </div>

                    <div className="flex flex-col gap-1 px-1">
                      <Link href={`/product/${product.slug?.current || product._id}`}>
                        <h3 className="font-bold text-[15px] md:text-[17px] text-black hover:underline decoration-2 underline-offset-4 leading-tight">
                          {product.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <p className={`font-medium text-[14px] ${product.sale ? 'text-red-600' : 'text-gray-600'}`}>
                          Rs. {product.price.toLocaleString('en-IN')}
                        </p>
                        {product.originalPrice && (
                          <p className="font-medium text-[12px] text-gray-400 line-through">
                            Rs. {product.originalPrice.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
