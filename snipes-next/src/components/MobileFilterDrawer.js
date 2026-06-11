"use client";
import { useFilterStore } from '@/store/useFilterStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileFilterDrawer({ searchParams, updateFilter }) {
  const { isMobileFilterOpen, closeMobileFilter } = useFilterStore();

  const handleApply = (key, value) => {
    updateFilter(key, value);
    // Optional: close immediately on selection, or wait for them to click 'View Results'
  };

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'new';

  return (
    <AnimatePresence>
      {isMobileFilterOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileFilter}
            className="fixed inset-0 bg-black/60 z-[999] md:hidden backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full h-[85vh] bg-[var(--color-background)] z-[1000] md:hidden rounded-t-3xl overflow-hidden flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-outline-variant)]">
              <h3 className="font-[var(--font-family-headline-md)] text-[20px] text-[var(--color-primary)]">Filter & Sort</h3>
              <button onClick={closeMobileFilter} className="p-2 rounded-full bg-[var(--color-surface-container)] text-[var(--color-primary)] active:scale-95 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              
              {/* Sort Section */}
              <section>
                <h4 className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)] mb-4">Sort By</h4>
                <div className="flex flex-col gap-2">
                  {['new', 'price-asc', 'price-desc', 'trending'].map((sortKey) => (
                    <button 
                      key={sortKey}
                      onClick={() => handleApply('sort', sortKey)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${currentSort === sortKey ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)]'}`}
                    >
                      <span className="font-[var(--font-family-body-md)] capitalize">
                        {sortKey === 'new' ? 'Newest Arrivals' : sortKey.replace('-', ' ')}
                      </span>
                      {currentSort === sortKey && <span className="material-symbols-outlined text-[18px]">check</span>}
                    </button>
                  ))}
                </div>
              </section>

              {/* Categories Section */}
              <section>
                <h4 className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)] mb-4">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {['all', 'shirts', 'bottoms', 'accessories', 'sale'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => handleApply('category', cat)}
                      className={`px-5 py-3 rounded-full font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest transition-all cursor-pointer ${currentCategory === cat ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-primary)] hover:bg-[var(--color-outline-variant)]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Sizes (Mock) */}
              <section>
                <h4 className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)] mb-4">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button 
                      key={size}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-[var(--color-outline-variant)] font-[var(--font-family-body-md)] text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--color-outline-variant)] bg-[var(--color-surface)]">
              <button 
                onClick={closeMobileFilter}
                className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 rounded-xl active:scale-95 transition-transform shadow-lg cursor-pointer"
              >
                View Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
