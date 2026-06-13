"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, isSyncing, syncWithSupabase } = useWishlistStore();
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartDrawer } = useUI();
  
  const [mounted, setMounted] = useState(false);
  const [isSimulatedLogin, setIsSimulatedLogin] = useState(false);
  const [notifyState, setNotifyState] = useState({}); // { [productId]: 'idle' | 'loading' | 'success' }
  const [emailInputs, setEmailInputs] = useState({});

  useEffect(() => setMounted(true), []);

  const handleMoveToCart = (product) => {
    addToCart({ ...product, size: 'M' }); // Defaulting size for quick add
    removeFromWishlist(product.id);
    openCartDrawer();
  };

  const handleNotifySubmit = async (e, product) => {
    e.preventDefault();
    const email = emailInputs[product.id];
    if (!email) return;

    setNotifyState(prev => ({ ...prev, [product.id]: 'loading' }));

    try {
      const res = await fetch('/api/notify-restock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId: product.id, productName: product.name })
      });
      
      if (res.ok) {
        setNotifyState(prev => ({ ...prev, [product.id]: 'success' }));
        setTimeout(() => {
           setNotifyState(prev => ({ ...prev, [product.id]: 'idle' }));
           setEmailInputs(prev => ({ ...prev, [product.id]: '' }));
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setNotifyState(prev => ({ ...prev, [product.id]: 'idle' }));
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/wishlist?shared=guest123`;
    navigator.clipboard.writeText(shareUrl);
    alert('Wishlist link copied to clipboard!'); // Simple toast for now
  };

  const handleSimulateLogin = async () => {
    setIsSimulatedLogin(true);
    await syncWithSupabase();
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--color-background)]"></div>;

  return (
    <main className="min-h-screen max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12 py-16 md:py-24 bg-[var(--color-background)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[var(--color-outline-variant)] pb-8 gap-6">
        <div>
          <h1 className="font-[var(--font-family-headline-lg)] text-4xl md:text-5xl text-[var(--color-primary)] mb-2">My Wishlist</h1>
          <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)]">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {!isSimulatedLogin ? (
            <button 
              onClick={handleSimulateLogin}
              className="flex-1 md:flex-none border border-[var(--color-outline-variant)] px-4 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-primary)] hover:bg-[var(--color-surface-container)] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_sync</span>
              Save to Account
            </button>
          ) : (
            <div className="flex-1 md:flex-none px-4 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-green-600 bg-green-50 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">{isSyncing ? 'sync' : 'cloud_done'}</span>
              {isSyncing ? 'Syncing...' : 'Synced to Supabase'}
            </div>
          )}
          
          <button 
            onClick={handleShare}
            className="flex-1 md:flex-none bg-[var(--color-surface-container-high)] px-4 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-primary)] hover:bg-[var(--color-outline-variant)] transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">ios_share</span>
            Share
          </button>
        </div>
      </div>

      {/* Wishlist Grid */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-[64px] text-[var(--color-outline-variant)] mb-6">favorite_border</span>
          <h2 className="font-[var(--font-family-headline-md)] text-2xl text-[var(--color-primary)] mb-4">Your wishlist is empty</h2>
          <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] mb-8">Save items you love here to buy them later.</p>
          <Link 
            href="/discover"
            className="bg-[var(--color-primary)] text-white px-8 py-4 font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest hover:bg-[var(--color-surface-tint)] transition-colors"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence>
            {wishlist.map((item) => {
              // Mocking out of stock randomly based on ID (for demonstration)
              const isOutOfStock = item.id % 2 === 0; 

              return (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full bg-[var(--color-surface-container)] rounded-[var(--border-radius-md)] overflow-hidden border border-transparent hover:border-[var(--color-outline-variant)] transition-colors"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden group">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                    
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-primary)] hover:bg-white hover:text-[var(--color-error)] transition-colors shadow-sm z-10"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>

                    {isOutOfStock && (
                      <div className="absolute top-3 left-3 bg-[var(--color-background)] px-2 py-1 text-[10px] font-[var(--font-family-label-caps)] uppercase tracking-widest text-[var(--color-outline)] z-10 shadow-sm">
                        Sold Out
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <Link href={`/product/${item.id}`} className="hover:underline underline-offset-4">
                      <h3 className="font-[var(--font-family-body-lg)] font-bold text-[14px] text-[var(--color-primary)] mb-1 line-clamp-1">{item.name}</h3>
                    </Link>
                    <p className="font-[var(--font-family-price-display)] text-[16px] text-[var(--color-outline)] mb-4">Rs. {item.price}.00</p>

                    <div className="mt-auto">
                      {!isOutOfStock ? (
                        <button 
                          onClick={() => handleMoveToCart(item)}
                          className="w-full bg-[var(--color-background)] border border-[var(--color-primary)] text-[var(--color-primary)] py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                        >
                          Move To Bag
                        </button>
                      ) : (
                        <div className="w-full">
                          {notifyState[item.id] === 'success' ? (
                            <div className="w-full bg-green-50 text-green-700 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-center flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">check</span> Will Notify
                            </div>
                          ) : (
                            <form onSubmit={(e) => handleNotifySubmit(e, item)} className="flex w-full">
                              <input 
                                type="email" 
                                placeholder="Email for restock..." 
                                required
                                value={emailInputs[item.id] || ''}
                                onChange={e => setEmailInputs(prev => ({...prev, [item.id]: e.target.value}))}
                                className="flex-grow bg-[var(--color-background)] border-y border-l border-[var(--color-outline-variant)] text-[12px] px-3 font-[var(--font-family-body-md)] focus:outline-none min-w-0"
                              />
                              <button 
                                type="submit"
                                disabled={notifyState[item.id] === 'loading'}
                                className="bg-[var(--color-primary)] text-white px-3 py-3 font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest disabled:opacity-70 flex-shrink-0"
                              >
                                {notifyState[item.id] === 'loading' ? '...' : 'Notify'}
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
