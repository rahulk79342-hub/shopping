"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUI } from '../context/UIContext';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useCurrency } from '@/hooks/useCurrency';

export default function ProductCard({ product, layout = 'normal' }) {
  const router = useRouter();
  const { openQuickAdd } = useUI();
  const addToCart = useCartStore(state => state.addToCart);
  const { formatPrice } = useCurrency();
  const { wishlist, toggleWishlist } = useWishlistStore();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isWishlisted = mounted ? wishlist.some(item => item.id === product.id) : false;

  const images = product.images || [product.image, product.image]; 

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleQuickAddSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, size, image: images[currentImageIdx] });
    router.push('/checkout');
  };

  const isDense = layout === 'dense';
  const isSoldOut = product.stock === 0;

  return (
    <div 
      className={`group card-zoom cursor-pointer relative flex flex-col ${product.type === 'tall' && !isDense ? 'masonry-item-tall' : product.type === 'short' && !isDense ? 'masonry-item-short' : !isDense ? 'masonry-item' : 'h-full'} mb-[var(--spacing-stack-lg)]`}
      onMouseEnter={() => router.prefetch(`/product/${product.id}`)}
    >
      <Link href={`/product/${product.id}`} className={`block relative overflow-hidden bg-[var(--color-surface-container)] mb-[var(--spacing-stack-sm)] aspect-[3/4] shrink-0`}>
        <Image 
          alt={product.name} 
          src={images[currentImageIdx]}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${isSoldOut ? 'blur-md opacity-80' : ''}`} 
          priority={product.id < 3}
        />
        
        {product.sale && !isSoldOut && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
            <span className="bg-white text-gray-600 font-[var(--font-family-body-md)] text-[11px] px-2.5 py-1 rounded-full shadow-sm">Sale</span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 flex flex-col items-center">
            <span className="bg-white/90 text-black font-[var(--font-family-label-caps)] text-[12px] px-4 py-2 uppercase tracking-widest shadow-md mb-2">Sold Out</span>
          </div>
        )}

        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ ...product, image: images[0] }); }}
          className={`absolute top-2 right-2 md:top-4 md:right-4 backdrop-blur-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 z-10 cursor-pointer shadow-sm ${isWishlisted ? 'bg-white text-[var(--color-sale-red)] opacity-100 scale-110' : 'bg-white/80 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110'}`}
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
        </button>

        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </>
        )}

        {/* Mobile Quick Add Bag Icon (Matches Screenshot) */}
        {!isSoldOut && (
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Optional: hook up to mobile quick add drawer */ }}
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:hidden bg-white rounded-full flex items-center justify-center shadow-md z-10 text-gray-800 border border-gray-100"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>local_mall</span>
          </button>
        )}

        {/* Full-width Quick Add Overlay / Size Flyout (Desktop) */}
        <div className="absolute bottom-0 left-0 w-full p-2 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 hidden md:block">
          {isSoldOut ? (
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full bg-white text-black font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest py-3 md:py-4 transition-colors duration-300 shadow-lg cursor-pointer hover:bg-[var(--color-surface-container)]"
            >
              Notify Me
            </button>
          ) : (
            <div className="bg-[var(--color-background)] shadow-2xl p-1 md:p-2 border border-[var(--color-outline-variant)]">
              <div className="text-center font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-outline)] mb-2 mt-1">Quick Add</div>
              <div className="grid grid-cols-4 gap-1">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={(e) => handleQuickAddSize(e, size)}
                    className="bg-[var(--color-surface-container)] text-[var(--color-primary)] font-[var(--font-family-body-md)] text-xs py-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="flex flex-col px-1 mt-2.5">
        <h3 className="font-[var(--font-family-body-md)] text-[12px] md:text-[14px] text-gray-800 leading-[1.4] mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex gap-1.5 items-baseline">
          <span className="font-bold text-[13px] md:text-[15px] text-black">
            {formatPrice(product.price).replace(/(\.00)?$/, '.00')}
          </span>
          {product.originalPrice && (
            <span className="font-[var(--font-family-body-md)] text-[11px] md:text-[13px] text-gray-400 line-through">
              {formatPrice(product.originalPrice).replace(/(\.00)?$/, '.00')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
