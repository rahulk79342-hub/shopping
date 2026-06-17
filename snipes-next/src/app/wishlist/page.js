"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';

export default function WishlistPage() {
  const wishlistItems = useWishlistStore(state => state.wishlistItems);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartDrawer } = useUI();

  const [mounted, setMounted] = useState(false);
  const [isSimulatedLogin, setIsSimulatedLogin] = useState(false);
  const [notifyState, setNotifyState] = useState({}); // { [productId]: 'idle' | 'loading' | 'success' }
  const [emailInputs, setEmailInputs] = useState({});
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('collections'); // 'collections' | 'items'

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      const { fetchMockProducts } = await import('@/lib/supabase');
      // Fetch all 40 items
      const allProducts = await fetchMockProducts({ pageParam: 0, limit: 40 });
      const wishlisted = allProducts.data.filter(p => wishlistItems.includes(p.id));
      setWishlistProducts(wishlisted);
      setIsLoading(false);
    };
    if (mounted) {
      loadWishlist();
    }
  }, [wishlistItems, mounted]);

  const handleMoveToCart = (product) => {
    addToCart({ ...product, size: 'M' }); // Defaulting size for quick add
    toggleWishlist(product.id);
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
    // syncWithSupabase() removed as it is not part of mock auth
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--color-background)]"></div>;

  if (viewMode === 'collections') {
    return (
      <main className="min-h-screen bg-white md:bg-gray-50 pb-20">
        <div className="max-w-4xl mx-auto bg-white min-h-screen md:min-h-0 md:mt-8 md:rounded-2xl md:shadow-sm md:border md:border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 text-center py-4 text-[#2c4bc4] border-b-2 border-[#2c4bc4] font-medium text-[15px]">
              My collections
            </button>
            <button className="flex-1 text-center py-4 text-gray-600 font-medium text-[15px] hover:text-gray-900 transition-colors">
              Collections I follow
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 bg-white md:bg-gray-50/50 min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div
                onClick={() => setViewMode('items')}
                className="bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden max-w-[400px]"
              >
                {/* Images Grid */}
                <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-100">
                  {[0, 1, 2, 3].map(i => {
                    const product = wishlistProducts[i];
                    const isLast = i === 3 && wishlistProducts.length > 4;

                    if (!product) {
                      // Empty placeholder if less than 4 items
                      return (
                        <div key={i} className="flex-1 aspect-square bg-white border border-gray-100 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-200 text-3xl">image</span>
                        </div>
                      );
                    }

                    return (
                      <div key={i} className="relative flex-1 aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"}
                          alt={product.name}
                          fill
                          className="object-cover p-1"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-[14px]">
                              + {wishlistProducts.length - 3} more
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1.5">My Wishlist</h3>
                  <div className="flex items-center text-[14px] text-gray-500 font-medium">
                    <span className="material-symbols-outlined text-[16px] mr-1.5">lock</span>
                    Private • {wishlistProducts.length} items
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-start p-4 bg-white border-b border-gray-100">
        <div className="flex items-start gap-3">
          <button onClick={() => setViewMode('collections')} className="mt-1 text-gray-700 hover:text-black transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">My Wishlist</h1>
            <div className="flex items-center text-[13px] text-gray-500 font-medium mt-0.5">
              <span className="material-symbols-outlined text-[14px] mr-1">lock</span>
              Private • {wishlistProducts.length} items
            </div>
          </div>
        </div>
        <button className="text-gray-500 mt-1">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-32 bg-white">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-[#2c4bc4] rounded-full animate-spin"></div>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white">
          <span className="material-symbols-outlined text-[64px] text-gray-300 mb-4">favorite_border</span>
          <h2 className="font-bold text-xl text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-6">Save items you love here to buy them later.</p>
          <button onClick={() => setViewMode('collections')} className="text-[#2c4bc4] font-medium hover:underline">
            Go Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 bg-gray-200 gap-[1px]">
          {wishlistProducts.map((item) => {
            // Mock random data to match screenshot vibe
            const originalPrice = item.originalPrice || Math.floor(item.price * 1.5);
            const discount = Math.round(((originalPrice - item.price) / originalPrice) * 100);
            const isOutOfStock = item.stock === 0;

            return (
              <div key={item.id} className="bg-white p-3 flex flex-col relative group">

                {/* 3 dot menu */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>

                {/* Image */}
                <div className="relative aspect-[3/4] w-full mb-3">
                  <Image
                    src={item.images?.[0] || item.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                  {isOutOfStock && (
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 z-10 shadow-sm rounded-sm">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[13px] text-gray-500 truncate mb-1">{item.name}</h3>

                {/* Price section */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-green-600 font-bold text-[14px] flex items-center tracking-tight">
                    ↓{discount}%
                  </span>
                  <span className="text-gray-400 line-through text-[13px] font-medium tracking-tight">₹{originalPrice}</span>
                  <span className="text-gray-900 font-bold text-[15px] tracking-tight">₹{item.price}</span>
                </div>

                {/* Rating and Assured Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-green-600 text-[13px] tracking-widest">
                    ★★★★<span className="text-gray-300">★</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-auto">
                  {!isOutOfStock ? (
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-2 border border-gray-300 text-[#2c4bc4] font-medium text-[14px] rounded hover:bg-blue-50 transition-colors bg-white shadow-sm"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 border border-gray-200 text-gray-400 font-medium text-[14px] rounded bg-gray-50"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
