"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getLookbookCampaign } from '@/lib/sanity';
import ShoppableHotspot from '@/components/ShoppableHotspot';
import OutfitBuilder from '@/components/OutfitBuilder';
import { MdOutlineFormatQuote } from 'react-icons/md';


export default function Lookbook() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const campaignData = await getLookbookCampaign();
      setData(campaignData);
    }
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[var(--color-background)] overflow-hidden">
      
      {/* Editorial Full-Bleed Hero */}
      <section className="relative w-full h-[85vh] md:h-screen">
        <Image 
          src={data.heroImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Hero Text */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 pointer-events-none">
          <span className="font-[var(--font-family-label-caps)] text-[10px] md:text-[12px] text-[var(--color-secondary)] uppercase tracking-[0.4em] block mb-2">
            Fall / Winter 2026
          </span>
          <h1 className="font-[var(--font-family-display-lg)] text-[40px] md:text-[80px] text-white leading-[1.1] uppercase tracking-tighter">
            {data.title}
          </h1>
        </div>

        {/* Shoppable Hotspots */}
        {data.hotspots.map(hotspot => (
          <ShoppableHotspot key={hotspot.id} hotspot={hotspot} />
        ))}
      </section>

      {/* Narrative Section */}
      <section className="max-w-[800px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12 py-24 md:py-32 text-center">
        <MdOutlineFormatQuote className="text-[32px] text-[var(--color-outline)] mb-6" />
        <p className="font-[var(--font-family-headline-md)] text-[24px] md:text-[32px] text-[var(--color-primary)] leading-tight mb-8">
          &quot;Redefining the modern silhouette with unstructured tailoring, premium linens, and a nod to classic motorsport heritage.&quot;
        </p>
        <span className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)] border-b border-[var(--color-outline-variant)] pb-2">
          Explore The Collection
        </span>
      </section>

      {/* Outfit Builder Section */}
      <OutfitBuilder data={data.outfitBuilder} />

    </main>
  );
}
