"use client";
import { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { MdOutlineClose } from 'react-icons/md';


export default function QuickAddModal() {
  const { quickAddProduct, closeQuickAdd, openCartDrawer } = useUI();
  const addToCart = useCartStore(state => state.addToCart);
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('Default');

  useEffect(() => {
    if (quickAddProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSize('M');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveColor('Default');
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Default', hex: '#1b1b1b' },
    { name: 'Light', hex: '#f3f3f3' },
    { name: 'Accent', hex: '#735c00' }
  ];

  const handleAdd = () => {
    addToCart({ ...quickAddProduct, size: activeSize, color: activeColor });
    closeQuickAdd();
    openCartDrawer();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={closeQuickAdd}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-[var(--border-radius-lg)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative z-10 animate-fade-in-up shadow-2xl">
        <button 
          onClick={closeQuickAdd} 
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white md:bg-transparent rounded-full flex items-center justify-center text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
        >
          <MdOutlineClose  />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[var(--color-surface-container)] h-[40vh] md:h-[600px] relative">
          <Image src={quickAddProduct.image} alt={quickAddProduct.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>

        {/* Right: Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-2">QUICK ADD</span>
          <h2 className="font-[var(--font-family-headline-lg)] text-[24px] md:text-[28px] text-[var(--color-primary)] leading-tight mb-2">
            {quickAddProduct.name}
          </h2>
          
          <div className="flex items-end gap-3 mb-8">
            <span className={`font-[var(--font-family-price-display)] text-[22px] ${quickAddProduct.sale ? 'text-[var(--color-sale-red)]' : 'text-[var(--color-primary)]'}`}>
              Rs. {quickAddProduct.price}.00
            </span>
            {quickAddProduct.originalPrice && (
              <span className="font-[var(--font-family-body-md)] text-[var(--color-outline)] line-through pb-0.5">
                Rs. {quickAddProduct.originalPrice}.00
              </span>
            )}
          </div>

          <div className="mb-6">
            <span className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)] mb-3 block">COLOR: {activeColor}</span>
            <div className="flex gap-3">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${activeColor === color.name ? 'border-[var(--color-primary)] scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)]">SELECT SIZE</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`py-3 font-[var(--font-family-label-caps)] text-[14px] border rounded-[var(--border-radius-sm)] transition-colors cursor-pointer ${activeSize === size ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--color-outline-variant)]">
            <button 
              onClick={handleAdd}
              className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[14px] py-4 hover:bg-[var(--color-surface-tint)] transition-colors active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
            >
              Add To Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
