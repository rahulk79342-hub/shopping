"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecentStore } from '@/store/useRecentStore';
import ProductCard from '@/components/ProductCard';

export default function RecentlyViewed() {
  const viewedItems = useRecentStore(state => state.recentProducts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || viewedItems.length === 0) return null;

  return (
    <>
      {/* Standard in-page row (All Devices) */}
      <section className="w-full px-4 md:px-8 xl:px-12 py-12 md:py-20 max-w-screen-2xl mx-auto bg-white border-b border-gray-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="font-bold text-[10px] uppercase tracking-widest text-gray-500 mb-2 block flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">history</span>
              Recent viewed
            </span>
            {/* <h2 className="text-[32px] font-bold text-black tracking-tighter leading-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Recently Viewed
            </h2> */}
          </div>
          <Link href="/account/history" className="text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
            View All History
          </Link>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x pb-4">
          {viewedItems.map((product) => (
            <div key={product.id} className="min-w-[160px] md:min-w-[280px] flex-1 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
