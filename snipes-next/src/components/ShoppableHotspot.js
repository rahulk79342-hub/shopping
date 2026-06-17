"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ShoppableHotspot({ hotspot }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="absolute z-10" 
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Hotspot Dot */}
      <div 
        className="relative cursor-pointer group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-white/40 rounded-full w-8 h-8 -left-2 -top-2"
        />
        <div className="w-4 h-4 bg-white rounded-full shadow-lg relative z-10 border-2 border-[var(--color-primary)] flex items-center justify-center group-hover:scale-125 transition-transform">
          <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
        </div>

        {/* Tooltip / Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 mt-4 bg-white w-48 md:w-56 p-3 shadow-2xl z-50 rounded-[var(--border-radius-lg)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-3 mb-3">
                <div className="relative w-12 h-16 bg-[var(--color-surface-container)] rounded-[var(--border-radius-md)] overflow-hidden shrink-0">
                  <Image 
                    src={hotspot.product.image} 
                    alt={hotspot.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-[var(--font-family-body-md)] text-xs text-[var(--color-primary)] font-bold line-clamp-2 leading-tight">
                    {hotspot.product.name}
                  </span>
                  <span className="font-[var(--font-family-price-display)] text-[var(--color-primary)] text-xs mt-1">
                    Rs. {hotspot.product.price}
                  </span>
                </div>
              </div>
              <Link 
                href={`/product/${hotspot.product.id || hotspot.product._id}`}
                className="block text-center w-full bg-[var(--color-primary)] text-white py-2 font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest hover:bg-[var(--color-secondary)] hover:text-[var(--color-on-secondary)] transition-colors rounded-[var(--border-radius-md)] mt-2"
              >
                View Details
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
