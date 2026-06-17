import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categorizedImages } from '@/lib/supabase';

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
    <section className="w-full pt-6 md:pt-10 pb-2 overflow-hidden bg-[var(--color-background)] border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x hide-scrollbar px-4 md:px-8 xl:px-12 items-start">
          {CATEGORIES.map(cat => (
            <Link href={cat.link} key={cat.id} className="snap-start flex flex-col md:items-start items-center gap-2 md:gap-3 flex-shrink-0 group w-[72px] md:w-[180px]">
              
              {/* Image Container */}
              <div className="relative w-[72px] h-[72px] md:w-full md:h-auto md:aspect-square rounded-full md:rounded-[16px] overflow-hidden bg-gray-100 border-[1.5px] border-gray-200 md:border-gray-100 md:border group-hover:border-black md:group-hover:shadow-md transition-all shadow-sm">
                <Image 
                  src={cat.img} 
                  fill 
                  className="object-cover object-top group-hover:scale-110 md:group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                  sizes="(max-width: 768px) 72px, 180px" 
                  alt={cat.title} 
                />
              </div>

              {/* Text Content */}
              <div className="flex md:w-full flex-col md:flex-row justify-between items-center md:items-start">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[11px] md:text-[16px] font-semibold md:font-bold text-black text-center md:text-left whitespace-nowrap">{cat.title}</span>
                  <span className="hidden md:block text-[12px] text-gray-500 font-medium">{cat.items}</span>
                </div>
                
                {/* Desktop Arrow */}
                <div className="hidden md:flex w-7 h-7 rounded-full bg-black items-center justify-center flex-shrink-0 ml-1 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                  <span className="material-symbols-outlined text-white text-[16px] -rotate-45" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
