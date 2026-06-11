"use client";
import { useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import { fetchMockProducts } from '@/lib/supabase';
import { useFilterStore } from '@/store/useFilterStore';

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerRef = useRef(null);

  const { viewLayout, setViewLayout, openMobileFilter } = useFilterStore();

  // Read current filters from URL
  const filters = {
    category: searchParams.get('category') || 'all',
    size: searchParams.get('size') || '',
    color: searchParams.get('color') || '',
    sale: searchParams.get('sale') === 'true',
  };
  const sort = searchParams.get('sort') || 'new';

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/discover?${params.toString()}`, { scroll: false });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['products', filters, sort],
    queryFn: ({ pageParam = 0 }) => fetchMockProducts({ pageParam, filters, sort }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const products = data ? data.pages.flatMap(page => page.data) : [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  // Infinite Scroll Observer
  useEffect(() => {
    const currentObserver = observerRef.current;
    if (!currentObserver || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    observer.observe(currentObserver);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] py-[var(--spacing-stack-lg)] min-h-screen">
      <section className="flex flex-col gap-[var(--spacing-stack-md)] mb-[var(--spacing-stack-lg)]">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] text-[var(--color-outline)] uppercase tracking-widest">
              Curated Collection
            </span>
            <h2 className="font-[var(--font-family-headline-lg)] text-[var(--text-headline-lg)] md:text-[48px] mt-1 text-[var(--color-primary)]">
              Discover
            </h2>
            <p className="text-sm text-[var(--color-outline)] mt-2">{totalCount} Products</p>
          </div>
          
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-[var(--color-outline-variant)] pr-6">
              <button 
                onClick={() => setViewLayout('normal')}
                className={`p-2 rounded transition-colors flex items-center justify-center cursor-pointer ${viewLayout === 'normal' ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)]' : 'text-[var(--color-outline)] hover:text-[var(--color-primary)]'}`}
                title="Grid View"
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>grid_view</span>
              </button>
              <button 
                onClick={() => setViewLayout('dense')}
                className={`p-2 rounded transition-colors flex items-center justify-center cursor-pointer ${viewLayout === 'dense' ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)]' : 'text-[var(--color-outline)] hover:text-[var(--color-primary)]'}`}
                title="Catalog View"
              >
                <span className="material-symbols-outlined">apps</span>
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 border border-[var(--color-outline)] px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">sort</span>
                <span className="font-[var(--font-family-label-caps)] text-[12px] uppercase">Sort By</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-outline-variant)] shadow-lg hidden group-hover:block z-50">
                {['new', 'price-asc', 'price-desc', 'trending'].map((s) => (
                  <button 
                    key={s} 
                    onClick={() => updateFilter('sort', s)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--color-surface-container)] transition-colors capitalize font-[var(--font-family-body-md)]"
                  >
                    {s === 'new' ? 'Newest' : s.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Quick Filter */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pt-4">
          {['all', 'shirts', 'bottoms', 'accessories', 'sale'].map(cat => (
            <button 
              key={cat}
              onClick={() => cat === 'sale' ? updateFilter('sale', filters.sale ? null : 'true') : updateFilter('category', cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-[var(--border-radius-lg)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] active:scale-95 transition-all cursor-pointer border uppercase tracking-widest ${
                (cat === 'sale' && filters.sale) || (cat !== 'sale' && filters.category === cat) 
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]' 
                  : 'bg-transparent text-[var(--color-on-surface)] border-[var(--color-outline-variant)] hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {status === 'pending' ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center flex-col gap-4">
          <span className="material-symbols-outlined text-[48px] text-[var(--color-outline)]">search_off</span>
          <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)]">No products found for these filters.</p>
          <button onClick={() => router.push('/discover')} className="text-[var(--color-primary)] underline uppercase font-[var(--font-family-label-caps)] text-xs">Clear Filters</button>
        </div>
      ) : (
        <section className={viewLayout === 'dense' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4' : 'masonry-grid'}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} layout={viewLayout} />
          ))}
        </section>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="w-full flex justify-center py-[var(--spacing-stack-xl)] h-24">
        {isFetchingNextPage && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest">Loading More</span>
          </div>
        )}
      </div>

      {/* Mobile Sticky Filter Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[var(--color-surface)] border-t border-[var(--color-outline-variant)] p-4 md:hidden z-40 flex justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={openMobileFilter}
          className="bg-[var(--color-primary)] text-white w-full max-w-[300px] py-3 rounded-full font-[var(--font-family-label-caps)] text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filter & Sort
        </button>
      </div>

      <MobileFilterDrawer searchParams={searchParams} updateFilter={updateFilter} />
    </main>
  );
}

// Wrap with Suspense because useSearchParams must be in a Suspense boundary
export default function Discover() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <DiscoverContent />
    </Suspense>
  );
}
