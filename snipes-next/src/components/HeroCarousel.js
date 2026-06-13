"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Linen Shirts",
    subtitle: "BREATHE EASY",
    imageDesktop: "https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5",
    imageMobile: "https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5", // Ideally use a portrait crop here
    link: "/discover",
  },
  {
    id: 2,
    title: "Printed Shirts",
    subtitle: "MAKE A STATEMENT",
    imageDesktop: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
    imageMobile: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
    link: "/discover",
  },
  {
    id: 3,
    title: "Old Money",
    subtitle: "TIMELESS ELEGANCE",
    imageDesktop: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
    imageMobile: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
    link: "/discover",
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, align: "center" }, // Smooth transition, align center
    [Autoplay({ delay: 10000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-background)] group pt-4 md:pt-8 pb-8 md:pb-12">
      <div className="overflow-hidden w-full h-[60vh] md:h-[75vh]" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y -ml-4 md:-ml-6">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_85%] md:flex-[0_0_60%] min-w-0 h-full pl-4 md:pl-6">
              <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm">
                {/* Desktop Image */}
                <Image
                  src={slide.imageDesktop}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="hidden md:block object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Mobile Image */}
                <Image
                  src={slide.imageMobile}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="block md:hidden object-cover object-top"
                  sizes="(max-width: 768px) 85vw, 100vw"
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-start items-center md:items-start text-center md:text-left pt-10 md:pt-12 px-6 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <h2 className="text-[32px] md:text-[48px] text-[#2c527a] leading-[1] mb-1" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                      {slide.title}
                    </h2>
                    <span className="font-[var(--font-family-label-caps)] text-[11px] md:text-[13px] text-gray-500 uppercase tracking-[0.2em] block font-semibold">
                      {slide.subtitle}
                    </span>
                  </motion.div>
                </div>
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
