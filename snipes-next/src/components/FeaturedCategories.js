import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { 
    id: 1, 
    title: 'Shirts', 
    items: '142 styles', 
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk',
    link: '/discover'
  },
  { 
    id: 2, 
    title: 'Trousers', 
    items: '89 styles', 
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN',
    link: '/discover'
  },
  { 
    id: 3, 
    title: 'Polo Tees', 
    items: '56 styles', 
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio',
    link: '/discover'
  },
  { 
    id: 4, 
    title: 'Sale', 
    items: '210 items', 
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5',
    link: '/discover'
  },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full py-8 md:py-16 overflow-hidden bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>Shop by Category</h2>
          </div>
        </div>

        {/* Desktop View: Visual Tiles */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <Link href={cat.link} key={cat.id} className="relative group overflow-hidden rounded-[24px] aspect-[4/5] block shadow-sm bg-gray-100">
              <Image 
                src={cat.img} 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                alt={cat.title} 
                sizes="25vw"
              />
              
              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-500"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-2 group-hover:-translate-y-2 transition-transform duration-300">{cat.title}</h3>
                
                {/* Subtle Overlay Content (Item count + Arrow) */}
                <div className="flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute left-0 right-0">
                  <span className="text-white/90 text-xs font-bold tracking-widest uppercase">{cat.items}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                     <span className="material-symbols-outlined text-white text-[16px] -rotate-45">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View: Circular Icon Pills (Horizontal Scroll) */}
        <div className="md:hidden flex overflow-x-auto gap-5 pb-6 snap-x hide-scrollbar -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <Link href={cat.link} key={cat.id} className="snap-start flex flex-col items-center gap-3 min-w-[76px] group">
              <div className="relative w-[76px] h-[76px] rounded-full overflow-hidden bg-gray-100 shadow-sm border border-gray-200 group-active:scale-95 transition-transform">
                 <Image src={cat.img} fill className="object-cover object-top" sizes="76px" alt={cat.title} />
              </div>
              <span className="text-[12px] font-bold text-center text-gray-800 leading-tight">{cat.title}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
