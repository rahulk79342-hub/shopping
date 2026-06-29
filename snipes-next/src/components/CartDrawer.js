"use client";
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '../context/UIContext';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cartItems, savedForLater, updateQuantity, removeFromCart, addToCart, saveForLater, moveToCart, removeSaved, cartTotal: getCartTotal } = useCartStore();
  const { isCartDrawerOpen, closeCartDrawer } = useUI();
  
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [confettiAnimationData, setConfettiAnimationData] = useState(null);

  useEffect(() => {
    setMounted(true);
    fetch('/confetti.json')
      .then(res => res.json())
      .then(data => setConfettiAnimationData(data))
      .catch(console.error);
  }, []);

  const cartTotal = getCartTotal();
  const FREE_SHIPPING_THRESHOLD = 2000;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountNeeded = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);
  
  const giftFee = isGift ? 99 : 0;
  const finalTotal = cartTotal - discount + giftFee;
  const loyaltyPoints = Math.floor(finalTotal * 0.05);

  // Delivery Date Calculation (3-5 days from now)
  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 3);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 5);
  const deliveryFormat = { month: 'short', day: 'numeric' };

  // Upsell Data
  const upsellProducts = [
    { id: 901, name: "Premium Shoetrees", price: 1299, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" },
    { id: 902, name: "Linen Care Spray", price: 599, image: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&w=800&q=80" }
  ];

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    
    if (promoCode.toUpperCase() === 'SNIPES10') {
      setDiscount(cartTotal * 0.1);
      setPromoSuccess('10% discount applied!');
      setPromoError('');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
      setPromoSuccess('');
      setShowConfetti(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoSuccess('');
    setPromoError('');
    setShowConfetti(false);
  };

  if (!mounted) return null;

  return (
    <Dialog.Root open={isCartDrawerOpen} onOpenChange={(open) => !open && closeCartDrawer()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        
        <Dialog.Content 
          className="fixed top-0 right-0 w-full md:w-[480px] h-full bg-white/70 backdrop-blur-3xl z-[90] shadow-2xl flex flex-col focus:outline-none data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right border-l border-white/40"
        >
          {showConfetti && confettiAnimationData && (
            <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center">
               <Lottie animationData={confettiAnimationData} loop={false} className="w-full h-full" />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col border-b border-black/10">
            <div className="flex justify-between items-center p-6 pb-4">
              <Dialog.Title className="font-black text-[22px] tracking-tight uppercase">
                YOUR BAG ({cartItems.length})
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-black/50 hover:text-black transition-colors cursor-pointer p-2 bg-black/5 hover:bg-black/10 rounded-full">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </Dialog.Close>
            </div>
            
            {/* Free Shipping Progress Bar */}
            {cartItems.length > 0 && (
              <div className="px-6 pb-4">
                <p className="text-[12px] mb-2 font-medium">
                  {amountNeeded > 0 ? (
                     <>You are <strong className="font-bold">Rs. {amountNeeded}.00</strong> away from free shipping!</>
                  ) : (
                     <span className="text-green-600 font-bold flex items-center gap-1">
                       <span className="material-symbols-outlined text-[14px]">local_shipping</span> 
                       You've unlocked free shipping!
                     </span>
                  )}
                </p>
                <div className="h-[4px] w-full bg-black/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full ${amountNeeded === 0 ? 'bg-green-600' : 'bg-black'}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-6 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="material-symbols-outlined text-[64px] text-black/20 mb-4">shopping_bag</span>
                <p className="text-black/60 mb-6 font-medium">Your bag is currently empty.</p>
                <button onClick={closeCartDrawer} className="bg-black text-white px-8 py-4 font-bold text-[12px] uppercase cursor-pointer hover:bg-black/80 transition-colors rounded-full shadow-lg">
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {cartItems.map(item => (
                    <motion.div 
                      key={`${item.id}-${item.size}`} 
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="flex gap-4 group bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-24 aspect-[3/4] bg-gray-100 flex-shrink-0 relative overflow-hidden rounded-xl">
                        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover"/>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="absolute top-1 right-1 p-1.5 bg-white/90 rounded-full text-black/50 hover:text-red-500 hover:bg-white transition-all cursor-pointer shadow-sm opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                      </div>
                      <div className="flex flex-col flex-grow py-1">
                        <h3 className="font-black text-[15px] uppercase leading-tight pr-6">{item.name}</h3>
                        <p className="text-[12px] text-black/60 mt-1 font-medium">Size: {item.size || 'M'}</p>
                        
                        <div className="mt-auto flex justify-between items-end">
                          <div className="flex items-center border border-black/10 rounded-full overflow-hidden bg-white/50 backdrop-blur-sm">
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} 
                              className="px-3 py-1 hover:bg-black/5 transition-colors cursor-pointer"
                            >
                              -
                            </motion.button>
                            <span className="px-2 py-1 text-[12px] min-w-[28px] text-center font-bold">{item.quantity}</span>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} 
                              className="px-3 py-1 hover:bg-black/5 transition-colors cursor-pointer"
                            >
                              +
                            </motion.button>
                          </div>
                          <span className="font-mono font-bold text-[16px]">Rs. {item.price * item.quantity}.00</span>
                        </div>
                        <div className="mt-3 text-right">
                          <button onClick={() => saveForLater(item)} className="text-[11px] text-black/50 hover:text-black transition-colors font-bold uppercase tracking-wider underline underline-offset-4">
                            Save for later
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Saved for Later Section */}
                {savedForLater.length > 0 && (
                  <div className="mt-4 pt-6 border-t border-black/10">
                    <h4 className="font-black text-[11px] text-black/50 uppercase tracking-widest mb-4">Saved for Later ({savedForLater.length})</h4>
                    <div className="flex flex-col gap-4">
                      {savedForLater.map(saved => (
                         <div key={`${saved.id}-${saved.size}-saved`} className="flex gap-4 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
                          <div className="w-16 aspect-[3/4] bg-gray-100 flex-shrink-0 relative overflow-hidden rounded-lg">
                            <Image src={saved.image} alt={saved.name} fill sizes="64px" className="object-cover opacity-80"/>
                          </div>
                          <div className="flex flex-col flex-grow py-1">
                            <h3 className="font-bold text-[12px] uppercase leading-tight">{saved.name}</h3>
                            <p className="text-[11px] text-black/60 font-medium">Size: {saved.size}</p>
                            <span className="font-mono font-bold text-[12px] text-black/60 mt-1">Rs. {saved.price}.00</span>
                            
                            <div className="mt-auto flex justify-between items-end">
                              <button onClick={() => removeSaved(saved.id, saved.size)} className="text-[10px] text-red-500/80 hover:text-red-600 font-bold uppercase underline">Remove</button>
                              <button onClick={() => moveToCart(saved)} className="bg-black/5 hover:bg-black text-black hover:text-white px-3 py-1 font-bold text-[10px] uppercase rounded-full transition-all">
                                Move to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Predictive Complete The Look Upsell */}
                <div className="pt-6 border-t border-black/10 relative">
                  <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-[#C2B280] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                    <span className="material-symbols-outlined text-[12px]">auto_awesome</span> Aura AI Suggests
                  </div>
                  <h4 className="font-black text-[14px] uppercase tracking-tight mb-4 text-center mt-2">Complete The Look</h4>
                  <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-2">
                    {upsellProducts.map(upsell => (
                      <div key={upsell.id} className="w-[140px] flex-shrink-0 group">
                        <div className="aspect-[4/5] relative overflow-hidden mb-3 bg-gray-100 rounded-2xl shadow-sm border border-black/5">
                           <Image src={upsell.image} alt={upsell.name} fill sizes="140px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <motion.button 
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={() => addToCart({...upsell, quantity: 1, size: 'OS'})}
                             className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-md text-black font-bold uppercase text-[10px] py-2 rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                           >
                             Add To Bag
                           </motion.button>
                        </div>
                        <h5 className="font-bold text-[12px] uppercase leading-tight line-clamp-1">{upsell.name}</h5>
                        <span className="font-mono text-[12px] text-black/60 font-bold">Rs. {upsell.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-[var(--color-outline-variant)] p-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
              
              {/* Promo Code Input */}
              <div className="mb-4">
                <details className="group">
                  <summary className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-primary)] cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden mb-2">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">sell</span> Apply Promo Code</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <form onSubmit={handleApplyPromo} className="flex pt-2 pb-1 relative">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Enter SNIPES10" 
                      className="flex-grow border border-[var(--color-outline-variant)] px-3 py-2 text-[12px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)] rounded-l-[var(--border-radius-sm)]"
                    />
                    <button type="submit" className="bg-[var(--color-primary)] text-white px-4 text-[10px] font-[var(--font-family-label-caps)] uppercase tracking-widest rounded-r-[var(--border-radius-sm)]">Apply</button>
                  </form>
                  {promoError && <p className="text-[10px] text-[var(--color-error)] mt-1">{promoError}</p>}
                  {promoSuccess && (
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[10px] text-green-600">{promoSuccess}</p>
                      <button onClick={handleRemovePromo} className="text-[10px] text-[var(--color-outline)] hover:underline">Remove</button>
                    </div>
                  )}
                </details>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-[var(--font-family-body-md)] text-[13px] text-[var(--color-outline)]">Subtotal</span>
                <span className="font-[var(--font-family-price-display)] text-[14px]">Rs. {cartTotal}.00</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center mb-1 text-green-600">
                  <span className="font-[var(--font-family-body-md)] text-[13px]">Discount</span>
                  <span className="font-[var(--font-family-price-display)] text-[14px]">- Rs. {discount.toFixed(2)}</span>
                </div>
              )}
              
              {/* Gift Options */}
              <div className="mb-2">
                <details className="group">
                  <summary className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-primary)] cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden mb-1">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">featured_seasonal_and_gifts</span> Gift Options</span>
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="pt-2 pb-2">
                    <label className="flex items-center gap-2 cursor-pointer font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)] mb-2">
                      <input type="checkbox" checked={isGift} onChange={() => setIsGift(!isGift)} className="accent-[var(--color-primary)] w-4 h-4" />
                      Add Premium Gift Wrapping (Rs. 99)
                    </label>
                    {isGift && (
                      <textarea 
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Add a personal message..."
                        className="w-full border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-2 text-xs font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        rows="2"
                      />
                    )}
                  </div>
                </details>
              </div>

              {isGift && (
                <div className="flex justify-between items-center mb-1 text-[var(--color-outline)]">
                  <span className="font-[var(--font-family-body-md)] text-[13px]">Gift Wrapping</span>
                  <span className="font-[var(--font-family-price-display)] text-[14px]">Rs. 99.00</span>
                </div>
              )}

              <div className="flex justify-between items-end mb-4 pt-2 border-t border-dashed border-[var(--color-outline-variant)] mt-2">
                <span className="font-[var(--font-family-body-lg)] font-bold">Estimated Total</span>
                <span className="font-[var(--font-family-price-display)] text-[24px] text-[var(--color-primary)]">Rs. {finalTotal.toFixed(2)}</span>
              </div>
              
              <div className="bg-[var(--color-surface-container-low)] p-3 rounded-[var(--border-radius-sm)] mb-4 flex flex-col gap-2">
                 <div className="flex items-start gap-2 pb-1">
                   <span className="material-symbols-outlined text-[16px] text-[var(--color-outline)] mt-0.5">local_shipping</span>
                   <p className="font-[var(--font-family-body-md)] text-[11px] text-[var(--color-outline)]">
                     Estimated Delivery: <strong className="text-[var(--color-primary)] font-bold">{deliveryStart.toLocaleDateString('en-US', deliveryFormat)} - {deliveryEnd.toLocaleDateString('en-US', deliveryFormat)}</strong>
                   </p>
                 </div>
              </div>

              {/* EMI Breakdown Widget */}
              {finalTotal > 2000 && (
                <div className="flex items-center justify-between border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-3 mb-4 bg-white/50">
                   <div className="flex items-center gap-2">
                     <span className="bg-[#00D1B2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide">simpl</span>
                     <p className="font-[var(--font-family-body-md)] text-[11px] text-[var(--color-primary)]">Pay in 3 parts of <strong className="font-bold">Rs. {(finalTotal / 3).toFixed(2)}</strong></p>
                   </div>
                   <span className="font-[var(--font-family-label-caps)] text-[9px] uppercase tracking-widest text-[var(--color-outline)] underline cursor-pointer">Learn More</span>
                </div>
              )}

              {/* Trust Row */}
              <div className="flex justify-center items-center gap-3 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">sync_alt</span> Free Returns</span>
                <span>•</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">lock</span> Secure Checkout</span>
                <span>•</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">receipt_long</span> GST Invoice</span>
              </div>

              {/* Massive VIP Points Nudge */}
              <div className="w-full bg-black text-white p-3 rounded-t-xl border-b border-white/20 flex items-center justify-center gap-2 shadow-[0_-5px_15px_rgba(234,179,8,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 pointer-events-none"></div>
                <span className="material-symbols-outlined text-yellow-500 text-[18px]">stars</span>
                <span className="font-bold text-[12px] uppercase tracking-widest">
                  Checkout now to earn <span className="text-yellow-500">{loyaltyPoints} VIP Points</span>!
                </span>
              </div>

              <Link 
                href="/checkout" 
                onClick={closeCartDrawer}
                className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] tracking-widest py-4 flex items-center justify-center hover:bg-[var(--color-surface-tint)] transition-colors active:scale-[0.99] uppercase cursor-pointer shadow-md rounded-b-[var(--border-radius-sm)] relative z-10"
              >
                Secure Checkout
              </Link>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
