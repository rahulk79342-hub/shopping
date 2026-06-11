"use client";
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { isCartDrawerOpen, closeCartDrawer } = useUI();

  return (
    <>
      {/* Backdrop */}
      {isCartDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] transition-opacity cursor-pointer"
          onClick={closeCartDrawer}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-white z-[90] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-outline-variant)]">
          <h2 className="font-[var(--font-family-headline-md)] text-[20px] text-[var(--color-primary)]">YOUR BAG ({cartItems.length})</h2>
          <button onClick={closeCartDrawer} className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer p-1">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="material-symbols-outlined text-[64px] text-[var(--color-outline-variant)] mb-4">shopping_bag</span>
              <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] mb-6">Your bag is currently empty.</p>
              <button onClick={closeCartDrawer} className="bg-[var(--color-primary)] text-white px-8 py-3 font-[var(--font-family-label-caps)] text-[12px] uppercase cursor-pointer hover:bg-[var(--color-surface-tint)]">
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 aspect-[3/4] bg-[var(--color-surface-container)] flex-shrink-0 relative overflow-hidden">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover"/>
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-[var(--color-outline)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <div className="flex flex-col flex-grow py-1">
                  <h3 className="font-[var(--font-family-body-md)] font-bold text-[14px] text-[var(--color-primary)] leading-snug">{item.name}</h3>
                  <p className="font-[var(--font-family-body-md)] text-[12px] text-[var(--color-outline)] mt-1">Size: {item.size || 'M'}</p>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 text-[var(--color-primary)] hover:bg-[var(--color-surface-container)] cursor-pointer">-</button>
                      <span className="px-2 py-0.5 font-[var(--font-family-body-md)] text-[12px] border-x border-[var(--color-outline-variant)] min-w-[30px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 text-[var(--color-primary)] hover:bg-[var(--color-surface-container)] cursor-pointer">+</button>
                    </div>
                    <span className="font-[var(--font-family-price-display)] text-[16px] text-[var(--color-primary)]">Rs. {item.price * item.quantity}.00</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-[var(--color-outline-variant)] p-6 bg-[var(--color-surface-container-low)]">
            <div className="flex justify-between items-end mb-4">
              <span className="font-[var(--font-family-body-lg)] font-bold">Subtotal</span>
              <span className="font-[var(--font-family-price-display)] text-[24px] text-[var(--color-primary)]">Rs. {cartTotal}.00</span>
            </div>
            <p className="text-[12px] text-[var(--color-outline)] mb-4">Shipping & taxes calculated at checkout.</p>
            <Link 
              href="/checkout" 
              onClick={closeCartDrawer}
              className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] py-4 flex items-center justify-center hover:bg-[var(--color-surface-tint)] transition-colors active:scale-[0.99] uppercase cursor-pointer"
            >
              Check Out
            </Link>
            <Link 
              href="/bag"
              onClick={closeCartDrawer}
              className="w-full text-center block mt-3 font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
            >
              VIEW BAG PAGE
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
