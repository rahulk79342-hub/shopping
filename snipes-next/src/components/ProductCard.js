"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUI } from '@/context/UIContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { openQuickAdd } = useUI();
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  const [activeImage, setActiveImage] = useState(product.img || product.imageUrl);
  const isWishlisted = isInWishlist(product.id || product._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id || product._id);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd({ ...product, img: activeImage });
  };

  const price = product.price;
  const originalPrice = product.originalPrice;
  const isSale = product.sale || !!originalPrice;

  return (
    <div className="group flex flex-col">
      <div className="relative h-[250px] md:h-[400px] rounded-[12px] md:rounded-[16px] overflow-hidden mb-3 md:mb-4 bg-[#f8f8f8] block w-full">
        <Link href={`/product/${product.slug?.current || product.id || product._id}`} className="absolute inset-0 z-0">
          <Image 
            src={activeImage} 
            fill 
            sizes="(max-width: 768px) 50vw, 25vw" 
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            alt={product.name || product.title} 
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <button 
          onClick={handleWishlist} 
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-sm"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.span 
            initial={false}
            animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
            className={`material-symbols-outlined text-[16px] md:text-[18px] transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-black'}`} 
            style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </motion.span>
        </button>

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-white/90 backdrop-blur-sm text-black text-[9px] md:text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            {product.tag}
          </div>
        )}

        {/* Quick Add Button (Reveals on Desktop Hover) */}
        <button 
          onClick={handleQuickAdd} 
          className="hidden md:flex absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md text-black font-bold text-[12px] py-3.5 rounded-full uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg items-center justify-center hover:bg-black hover:text-white"
        >
          Quick Add
        </button>
        
        {/* Quick Add Button (Mobile always visible icon) */}
        <button 
          onClick={handleQuickAdd} 
          className="md:hidden absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
           <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
        </button>
      </div>

      {/* Info & Swatches */}
      <div className="flex justify-between items-start px-1">
        <div className="flex flex-col">
          <Link href={`/product/${product.slug?.current || product.id || product._id}`} className="font-bold text-[13px] md:text-[15px] text-black leading-tight mb-1 hover:underline decoration-2 underline-offset-4">
            {product.name || product.title}
          </Link>
          <div className="flex items-center gap-2">
            <p className={`text-[12px] md:text-[14px] font-medium ${isSale ? 'text-red-600' : 'text-gray-600'}`}>
              {typeof price === 'number' ? `Rs. ${price.toLocaleString('en-IN')}` : price}
            </p>
            {originalPrice && (
              <p className="text-[11px] md:text-[12px] text-gray-400 line-through">
                {typeof originalPrice === 'number' ? `Rs. ${originalPrice.toLocaleString('en-IN')}` : originalPrice}
              </p>
            )}
          </div>
        </div>

        {/* Hover Color Swatches */}
        {product.colors && (
          <div className="flex gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
            {product.colors.map(color => (
              <button
                key={color.name}
                onMouseEnter={() => setActiveImage(color.img)}
                onClick={() => setActiveImage(color.img)}
                className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-gray-300 hover:scale-125 hover:border-black transition-all cursor-pointer shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`View ${color.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
