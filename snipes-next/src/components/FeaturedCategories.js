import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categorizedImages } from '@/lib/supabase';
import HolographicCard from '@/components/HolographicCard';
import MagneticButton from '@/components/MagneticButton';

const CATEGORIES = [
  {
    id: 1,
    title: 'Printed',
    items: '33 items',
    img: categorizedImages.shirts[0],
    link: '/discover'
  },
  {
    id: 2,
    title: 'Stripes',
    items: '20 items',
    img: categorizedImages.shirts[1],
    link: '/discover'
  },
  {
    id: 3,
    title: 'Solid',
    items: '45 items',
    img: categorizedImages.shirts[2],
    link: '/discover'
  },
  {
    id: 4,
    title: 'Denim',
    items: '43 items',
    img: categorizedImages.bottoms[0],
    link: '/discover'
  },
  {
    id: 5,
    title: 'Linen',
    items: '18 items',
    img: categorizedImages.shirts[3],
    link: '/discover'
  },
  {
    id: 6,
    title: 'Shorts',
    items: '25 items',
    img: categorizedImages.bottoms[1],
    link: '/discover'
  },
  {
    id: 7,
    title: 'Accessories',
    items: '12 items',
    img: categorizedImages.accessories[0],
    link: '/discover'
  },
  {
    id: 8,
    title: 'Outerwear',
    items: '8 items',
    img: categorizedImages.shirts[4],
    link: '/discover'
  },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full pt-6 md:pt-16 pb-10 overflow-hidden bg-[var(--color-background)] border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-8 pt-4 snap-x hide-scrollbar px-4 md:px-8 xl:px-12 items-start cursor-none">
          {CATEGORIES.map(cat => (
            <Link href={cat.link} key={cat.id} className="snap-start flex flex-col md:items-start items-center gap-2 md:gap-4 flex-shrink-0 group w-[72px] md:w-[220px]">
              
              {/* 3D Image Container */}
              <HolographicCard glareIntensity={0.4} className="relative w-[72px] h-[72px] md:w-full md:h-auto md:aspect-[4/5] rounded-full md:rounded-3xl bg-gray-100 border-[1.5px] md:border-0 border-gray-200 shadow-sm md:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                <Image 
                  src={cat.img} 
                  fill 
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                  sizes="(max-width: 768px) 72px, 220px" 
                  alt={cat.title} 
                />
              </HolographicCard>

              {/* Text Content with Magnetic Arrow */}
              <div className="flex md:w-full flex-col md:flex-row justify-between items-center md:items-start pointer-events-auto">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[11px] md:text-[18px] font-semibold md:font-black text-black text-center md:text-left whitespace-nowrap uppercase tracking-tight">{cat.title}</span>
                  <span className="hidden md:block text-[12px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">{cat.items}</span>
                </div>
                
                {/* Desktop Arrow wrapped in MagneticButton */}
                <div className="hidden md:block">
                  <MagneticButton strength={20}>
                    <div className="flex w-9 h-9 rounded-full bg-black items-center justify-center flex-shrink-0 group-hover:bg-[#C2B280] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                      <span className="material-symbols-outlined text-white text-[18px] -rotate-45" style={{ fontVariationSettings: "'wght' 700" }}>arrow_forward</span>
                    </div>
                  </MagneticButton>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
