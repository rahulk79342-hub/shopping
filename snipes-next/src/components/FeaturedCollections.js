import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const COLLECTIONS = [
  {
    id: 1,
    title: "The Summer Edit",
    subtitle: "Breathable linen and vibrant prints designed for the heat.",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
    link: "/discover",
    cta: "Shop Summer"
  },
  {
    id: 2,
    title: "Workwear Essentials",
    subtitle: "Sharp staples for the modern office.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN",
    link: "/discover",
    cta: "Shop Workwear"
  },
  {
    id: 3,
    title: "Vacation Ready",
    subtitle: "Effortless resort wear.",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
    link: "/discover",
    cta: "Shop Resort"
  }
];

export default function FeaturedCollections() {
  const hero = COLLECTIONS[0];
  const smalls = COLLECTIONS.slice(1, 3);

  return (
    <section className="w-full py-12 md:py-16 overflow-hidden bg-[var(--color-background)]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>Curated Collections</h2>
            <p className="text-gray-500 text-[14px] mt-2 max-w-md">Editorial drops and seasonal highlights picked by our stylists.</p>
          </div>
          <Link href="/discover" className="hidden md:inline-block text-[12px] font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            View All
          </Link>
        </div>

        {/* Desktop View: Asymmetric 2/3 + 1/3 Split */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[600px] xl:h-[700px]">
          {/* Hero Card (2/3 width, full height) */}
          <Link href={hero.link} className="col-span-2 row-span-2 relative rounded-[24px] overflow-hidden group">
             <Image src={hero.img} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" alt={hero.title} sizes="66vw" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
             
             <div className="absolute bottom-10 left-10 max-w-md">
                <h3 className="text-white text-[40px] font-bold leading-tight mb-3" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{hero.title}</h3>
                <p className="text-white/90 text-[16px] mb-6">{hero.subtitle}</p>
                <div className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-[12px] uppercase tracking-widest group-hover:bg-gray-100 transition-colors">
                  {hero.cta}
                  <span className="material-symbols-outlined text-[16px] -rotate-45">arrow_forward</span>
                </div>
             </div>
          </Link>

          {/* Small Cards (1/3 width, half height each) */}
          {smalls.map(collection => (
             <Link key={collection.id} href={collection.link} className="col-span-1 row-span-1 relative rounded-[24px] overflow-hidden group">
               <Image src={collection.img} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" alt={collection.title} sizes="33vw" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
               
               <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-[24px] font-bold leading-tight mb-2" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{collection.title}</h3>
                  <div className="flex items-center gap-2 text-white/90 font-bold text-[11px] uppercase tracking-widest group-hover:text-white transition-colors">
                    <span className="border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">{collection.cta}</span>
                  </div>
               </div>
             </Link>
          ))}
        </div>

        {/* Mobile View: Stacked (Hero full width, Small side-by-side) */}
        <div className="md:hidden flex flex-col gap-4">
          <Link href={hero.link} className="relative w-full h-[450px] rounded-[20px] overflow-hidden group">
             <Image src={hero.img} fill className="object-cover object-top group-active:scale-105 transition-transform duration-700" alt={hero.title} sizes="100vw" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
             
             <div className="absolute bottom-8 left-6 right-6">
                <h3 className="text-white text-[32px] font-bold leading-tight mb-2" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{hero.title}</h3>
                <p className="text-white/90 text-[14px] mb-5">{hero.subtitle}</p>
                <div className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest">
                  {hero.cta}
                </div>
             </div>
          </Link>

          <div className="grid grid-cols-2 gap-4 h-[250px]">
             {smalls.map(collection => (
                <Link key={collection.id} href={collection.link} className="relative rounded-[16px] overflow-hidden group">
                   <Image src={collection.img} fill className="object-cover object-center group-active:scale-105 transition-transform duration-700" alt={collection.title} sizes="50vw" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                   
                   <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-[16px] font-bold leading-tight mb-1" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{collection.title}</h3>
                      <span className="text-white/90 font-bold text-[10px] uppercase tracking-widest border-b border-white/50 pb-0.5">{collection.cta}</span>
                   </div>
                </Link>
             ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/discover" className="inline-block text-[12px] font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1">
            View All Collections
          </Link>
        </div>

      </div>
    </section>
  );
}
