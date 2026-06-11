"use client";
import { useEffect, useRef } from 'react';
import { useUI } from '../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  const trendingSearches = ["Linen Shirts", "Oversized Tees", "Cargo Pants", "Old Money"];
  const recentProducts = [
    {
      id: 1,
      name: "Digital Printed Shirt - Arctic Blue",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
      price: 899
    },
    {
      id: 2,
      name: "Charcoal Gurkha Pants",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN",
      price: 1499
    }
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[var(--color-background)]/95 backdrop-blur-xl overflow-y-auto"
        >
          <div className="max-w-[1000px] mx-auto px-[var(--spacing-margin-mobile)] py-8 md:py-16">
            <div className="flex justify-between items-center mb-12">
              <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest">Search</span>
              <button 
                onClick={closeSearch}
                className="w-12 h-12 rounded-full hover:bg-[var(--color-surface-container)] flex items-center justify-center transition-colors text-[var(--color-outline)] hover:text-[var(--color-primary)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative mb-16"
            >
              <input 
                ref={inputRef}
                type="text" 
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-b-2 border-[var(--color-outline-variant)] focus:border-[var(--color-secondary)] pb-4 text-3xl md:text-5xl font-[var(--font-family-headline-lg)] text-[var(--color-primary)] placeholder-[var(--color-outline-variant)] focus:outline-none transition-colors"
              />
              <span className="material-symbols-outlined absolute right-0 bottom-4 text-3xl md:text-5xl text-[var(--color-secondary)]">search</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)] mb-6 uppercase tracking-widest">Trending Searches</h3>
                <ul className="flex flex-col gap-4">
                  {trendingSearches.map((term, i) => (
                    <li key={i}>
                      <button className="font-[var(--font-family-body-lg)] text-[20px] text-[var(--color-outline)] hover:text-[var(--color-secondary)] transition-colors text-left flex items-center gap-2 group cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">trending_up</span>
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)] mb-6 uppercase tracking-widest">Recently Viewed</h3>
                <div className="flex flex-col gap-4">
                  {recentProducts.map(product => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 group p-2 hover:bg-[var(--color-surface-container)] rounded-lg transition-colors"
                    >
                      <div className="w-16 h-20 relative bg-[var(--color-surface-container-high)] rounded overflow-hidden">
                        <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-[var(--font-family-body-md)] font-bold text-[14px] text-[var(--color-primary)] line-clamp-1">{product.name}</h4>
                        <p className="font-[var(--font-family-price-display)] text-[14px] text-[var(--color-outline)] mt-1">Rs. {product.price}.00</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
