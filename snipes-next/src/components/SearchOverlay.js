"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import { useUI } from '../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Algolia Integration
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, useInstantSearch, useSearchBox, useHits } from 'react-instantsearch';

// Using Algolia's public test credentials for immediate functionality
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

// Custom SearchBox Component to match design system
function CustomSearchBox({ onUploadClick }) {
  const { query, refine, clear } = useSearchBox();
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
  }, []);

  return (
    <div className="relative mb-8">
      <input 
        ref={inputRef}
        type="text" 
        value={query}
        onChange={(e) => refine(e.target.value)}
        placeholder="What are you looking for?"
        className="w-full bg-transparent border-b-2 border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] pb-4 text-2xl md:text-5xl font-[var(--font-family-headline-lg)] text-[var(--color-primary)] placeholder-[var(--color-outline-variant)] focus:outline-none transition-colors pr-24"
      />
      
      <div className="absolute right-0 bottom-4 flex items-center gap-4">
        {query ? (
          <button onClick={() => clear()} className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] md:text-[32px]">close</span>
          </button>
        ) : (
          <button onClick={onUploadClick} className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center justify-center group" title="Visual Search">
             <span className="material-symbols-outlined text-[24px] md:text-[32px] group-hover:scale-110 transition-transform">photo_camera</span>
          </button>
        )}
        <span className="material-symbols-outlined text-[24px] md:text-[36px] text-[var(--color-primary)] pointer-events-none">search</span>
      </div>
    </div>
  );
}

// Custom Hit Component for Product Results
function Hit({ hit }) {
  const { closeSearch } = useUI();
  return (
    <Link 
      href={`/product/1`} // Mocked URL
      onClick={closeSearch}
      className="flex flex-col gap-2 group cursor-pointer"
    >
      <div className="w-full aspect-square relative bg-[var(--color-surface-container)] rounded-[var(--border-radius-md)] overflow-hidden">
        <Image 
          src={hit.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW'} 
          alt={hit.name} 
          fill 
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div>
        <h4 className="font-[var(--font-family-body-md)] font-bold text-sm text-[var(--color-primary)] line-clamp-1">{hit.name}</h4>
        <p className="font-[var(--font-family-price-display)] text-sm text-[var(--color-outline)] mt-1">Rs. {hit.price || '899'}.00</p>
      </div>
    </Link>
  );
}

// Zero-Results AI Fallback Component
function ZeroResultsAIFallback({ query }) {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate AI thinking time
    const timer = setTimeout(() => setIsProcessing(false), 2000);
    return () => clearTimeout(timer);
  }, [query]);

  const mockAlternatives = [
    { id: 10, name: "AI Suggested: Flowy Red Dress", image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", price: 2499 },
    { id: 11, name: "AI Suggested: Crimson Maxi", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN", price: 1899 }
  ];

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] text-[var(--color-primary)] animate-spin mb-4">refresh</span>
        <h3 className="font-[var(--font-family-headline-md)] text-xl text-[var(--color-primary)] mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#003dff]">auto_awesome</span>
          Claude-Sonnet-4 Processing...
        </h3>
        <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-sm">Analyzing intent for &quot;{query}&quot;...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h3 className="font-[var(--font-family-headline-md)] text-2xl text-[var(--color-primary)] mb-2">No exact matches found.</h3>
        <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)]">But our AI found some great alternatives based on your search intent.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {mockAlternatives.map(hit => <Hit key={hit.id} hit={hit} />)}
      </div>
    </div>
  );
}

// Controller to manage Views (Trending vs Results)
function SearchContent({ onUploadClick }) {
  const { status } = useInstantSearch();
  const { query, refine } = useSearchBox();
  const { hits } = useHits();

  const trendingSearches = ["Linen Shirts", "Oversized Tees", "Cargo Pants", "Old Money"];
  const naturalLanguagePrompts = ["flowy red dress for Diwali", "oversized black linen for summer", "wedding guest attire under Rs. 3000"];
  const recentProducts = [
    { id: 1, name: "Digital Printed Shirt - Arctic Blue", image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", price: 899 },
    { id: 2, name: "Charcoal Gurkha Pants", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN", price: 1499 }
  ];

  return (
    <>
      <CustomSearchBox onUploadClick={onUploadClick} />
      
      {query.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <div className="flex justify-between items-center mb-6 border-b border-[var(--color-outline-variant)] pb-4">
            <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-outline)] uppercase tracking-widest">
              {status === 'stalled' ? 'Searching...' : 'Products'}
            </h3>
            <span className="font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)] flex items-center gap-1">
              Powered by <span className="text-[#003dff] font-bold">Algolia</span>
            </span>
          </div>
          <div className="overflow-y-auto max-h-[60vh] pb-24 hide-scrollbar">
            {hits.length === 0 && status !== 'stalled' ? (
              <ZeroResultsAIFallback query={query} />
            ) : (
              <Hits hitComponent={Hit} classNames={{ list: 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8' }} />
            )}
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)] mb-6 uppercase tracking-widest">Trending Searches</h3>
            <ul className="flex flex-col gap-4 mb-10">
              {trendingSearches.map((term, i) => (
                <li key={i}>
                  <button onClick={() => refine(term)} className="font-[var(--font-family-body-lg)] text-[20px] text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors text-left flex items-center gap-2 group cursor-pointer w-full">
                    <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">trending_up</span>
                    {term}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[#003dff] mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Try Semantic Search
            </h3>
            <div className="flex flex-wrap gap-2">
              {naturalLanguagePrompts.map((prompt, i) => (
                <button 
                  key={i} 
                  onClick={() => refine(prompt)}
                  className="bg-[var(--color-surface-container)] hover:bg-[#003dff] text-[var(--color-primary)] hover:text-white border border-[var(--color-outline-variant)] hover:border-[#003dff] px-4 py-2 rounded-full font-[var(--font-family-body-md)] text-xs transition-colors cursor-pointer"
                >
                  &quot;{prompt}&quot;
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)] mb-6 uppercase tracking-widest">Recently Viewed</h3>
            <div className="flex flex-col gap-4">
              {recentProducts.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="flex items-center gap-4 group p-3 hover:bg-[var(--color-surface-container-low)] rounded-[var(--border-radius-md)] border border-transparent hover:border-[var(--color-outline-variant)] transition-all">
                  <div className="w-16 h-20 relative bg-[var(--color-surface-container)] rounded overflow-hidden shrink-0">
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
      )}
    </>
  );
}

// Visual Search Upload Component
function VisualSearchUI({ onClose }) {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setIsScanning(true);
      
      // Simulate AI scan delay then return to search (mock behavior)
      setTimeout(() => {
        setIsScanning(false);
        onClose("Linen Shirt"); // Mock AI detection result
      }, 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 bg-[var(--color-background)] flex flex-col items-center justify-center p-6"
    >
      <button onClick={() => onClose()} className="absolute top-8 right-8 text-[var(--color-outline)] hover:text-[var(--color-primary)]">
        <span className="material-symbols-outlined text-[32px]">close</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="font-[var(--font-family-headline-lg)] text-3xl md:text-4xl text-[var(--color-primary)] mb-2">Visual Search</h2>
        <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)]">Upload a photo to find similar styles.</p>
      </div>

      <div className="w-full max-w-md aspect-square relative bg-[var(--color-surface-container)] rounded-3xl overflow-hidden border-2 border-dashed border-[var(--color-outline-variant)] flex items-center justify-center group">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        
        {preview ? (
          <>
            <Image src={preview} alt="Upload Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 z-10" />
            
            {/* Scanning Laser Animation */}
            {isScanning && (
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute left-0 w-full h-[3px] bg-[#003dff] z-20 shadow-[0_0_20px_#003dff]"
              />
            )}
            
            <div className="absolute z-20 flex flex-col items-center">
              <span className="material-symbols-outlined text-white text-[48px] animate-pulse mb-4">view_in_ar</span>
              <p className="text-white font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase bg-black/50 px-4 py-2 rounded-full border border-white/20">Claude Vision Identifying...</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-[var(--color-outline)] group-hover:text-[var(--color-primary)] transition-colors pointer-events-none">
             <span className="material-symbols-outlined text-[64px] mb-4">cloud_upload</span>
             <p className="font-[var(--font-family-label-caps)] text-sm tracking-widest uppercase">Tap to Upload</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  // When closing overall search, reset visual search state
  useEffect(() => {
    if (!isSearchOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowVisualSearch(false);
      setInitialQuery('');
    }
  }, [isSearchOpen]);

  const handleVisualSearchComplete = (detectedTerm) => {
    setShowVisualSearch(false);
    if (detectedTerm) {
      setInitialQuery(detectedTerm);
    }
  };

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
          <div className="max-w-[1200px] mx-auto px-[var(--spacing-margin-mobile)] py-8 md:py-16 relative min-h-screen">
            <div className="flex justify-between items-center mb-8">
              <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest">Search</span>
              <button 
                onClick={closeSearch}
                className="w-12 h-12 rounded-full hover:bg-[var(--color-surface-container)] flex items-center justify-center transition-colors text-[var(--color-outline)] hover:text-[var(--color-primary)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            <InstantSearch searchClient={searchClient} indexName="instant_search" initialUiState={{ instant_search: { query: initialQuery }}}>
              <SearchContent onUploadClick={() => setShowVisualSearch(true)} />
            </InstantSearch>

            {/* Visual Search Overlay on top of Search Overlay */}
            <AnimatePresence>
              {showVisualSearch && (
                <VisualSearchUI onClose={handleVisualSearchComplete} />
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
