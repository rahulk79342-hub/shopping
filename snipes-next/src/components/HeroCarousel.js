"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  {
    id: 1,
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
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
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
