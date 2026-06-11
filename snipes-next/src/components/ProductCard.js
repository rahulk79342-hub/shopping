"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUI } from '../context/UIContext';

export default function ProductCard({ product, layout = 'normal' }) {
  const { openQuickAdd } = useUI();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

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

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd({ ...product, image: images[currentImageIdx] });
  };

  const isDense = layout === 'dense';

  return (
    <div className={`group card-zoom cursor-pointer relative ${product.type === 'tall' && !isDense ? 'masonry-item-tall' : product.type === 'short' && !isDense ? 'masonry-item-short' : isDense ? 'h-[300px]' : 'masonry-item'} mb-[var(--spacing-stack-lg)]`}>
      <Link href={`/product/${product.id}`} className={`block relative overflow-hidden bg-[var(--color-surface-container)] mb-[var(--spacing-stack-sm)] ${isDense ? 'h-full' : 'aspect-[3/4]'}`}>
        <Image 
          alt={product.name} 
          src={images[currentImageIdx]}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out" 
          priority={product.id < 3}
        />
        
        {product.sale && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
            <span className="bg-[var(--color-sale-red)] text-white font-[var(--font-family-label-caps)] text-[10px] px-2 py-1 uppercase">Sale</span>
          </div>
        )}

        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/80 backdrop-blur-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-white text-[var(--color-primary)] cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">favorite</span>
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

        <button 
          onClick={handleQuickAdd}
          className="absolute bottom-4 right-4 bg-white text-[var(--color-primary)] w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
        </button>
      </Link>
      
      {!isDense && (
        <div className="flex flex-col gap-1 px-1">
          <h3 className="font-[var(--font-family-body-md)] text-[var(--text-body-md)] font-bold text-[var(--color-primary)] leading-snug line-clamp-1">{product.name}</h3>
          <div className="flex gap-2 items-center mt-1">
            <span className={`font-[var(--font-family-price-display)] text-[16px] md:text-[var(--text-price-display)] ${product.sale ? 'text-[var(--color-sale-red)]' : 'text-[var(--color-primary)]'}`}>
              Rs. {product.price}.00
            </span>
            {product.originalPrice && (
              <span className="font-[var(--font-family-body-md)] text-[12px] md:text-[14px] text-[var(--color-outline)] line-through">
                Rs. {product.originalPrice}.00
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
