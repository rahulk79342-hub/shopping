"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUI } from '../context/UIContext';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useCurrency } from '@/hooks/useCurrency';
import { MdOutlineFavorite, MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineLocalMall, MdOutlineAdd } from 'react-icons/md';


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
          <MdOutlineFavorite className="text-[18px] md:text-[20px]"  />
        </button>

        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer shadow-sm"
            >
              <MdOutlineChevronLeft className="text-[16px]" />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer shadow-sm"
            >
              <MdOutlineChevronRight className="text-[16px]" />
            </button>
          </>
        )}

        {/* Quick Add Button (Mobile & Desktop Hover) */}
        {!isSoldOut && (
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openQuickAdd(product); }}
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10 text-gray-800 border border-gray-100 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-105"
          >
            <MdOutlineLocalMall className="text-[14px] md:hidden" />
            <MdOutlineAdd className="text-[20px] hidden md:block" />
          </button>
        )}
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
