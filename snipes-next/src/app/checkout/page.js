"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const shippingCost = 150;
  const grandTotal = cartTotal + (cartTotal > 0 ? shippingCost : 0);

  const steps = [
    { id: 1, title: "Contact Information" },
    { id: 2, title: "Shipping Address" },
    { id: 3, title: "Payment Method" }
  ];

  const handleNext = () => {
    if (activeStep < 3) setActiveStep(prev => prev + 1);
    else {
      setIsProcessing(true);
      setTimeout(() => {
        alert("Payment Successful! Your order has been placed.");
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto px-[var(--spacing-margin-mobile)] py-[var(--spacing-stack-xl)] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left: Animated Accordion Checkout Flow */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm text-[var(--color-outline)] mb-4">
            <Link href="/bag" className="hover:text-[var(--color-primary)]">Cart</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[var(--color-primary)]">Checkout</span>
          </div>

          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <div key={step.id} className="border border-[var(--color-outline-variant)] bg-white overflow-hidden rounded-lg shadow-sm">
                <button 
                  onClick={() => isCompleted && setActiveStep(step.id)}
                  className={`w-full p-6 flex justify-between items-center text-left ${isCompleted ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive || isCompleted ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {isCompleted ? <span className="material-symbols-outlined text-[16px]">check</span> : step.id}
                    </span>
                    <h2 className={`font-[var(--font-family-headline-md)] text-xl ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-outline)]'}`}>
                      {step.title}
                    </h2>
                  </div>
                  {isCompleted && <span className="text-[var(--color-primary)] text-sm underline">Edit</span>}
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-[var(--color-outline-variant)]/50 mt-2">
                        {step.id === 1 && (
                          <div className="flex flex-col gap-4 mt-4">
                            <input type="email" placeholder="Email address" className="w-full border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            <div className="flex gap-2 items-center">
                              <input type="checkbox" id="offers" className="accent-[var(--color-primary)] w-4 h-4" />
                              <label htmlFor="offers" className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)]">Email me with news and offers</label>
                            </div>
                          </div>
                        )}

                        {step.id === 2 && (
                          <div className="flex flex-col gap-4 mt-4">
                            <div className="flex gap-4">
                              <input type="text" placeholder="First name" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                              <input type="text" placeholder="Last name" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            </div>
                            <input type="text" placeholder="Address" className="w-full border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            <div className="flex gap-4">
                              <input type="text" placeholder="City" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                              <input type="text" placeholder="Postal code" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            </div>
                          </div>
                        )}

                        {step.id === 3 && (
                          <div className="flex flex-col gap-4 mt-4">
                            <div className="border border-[var(--color-primary)] p-4 rounded bg-gray-50 flex items-center gap-3">
                              <input type="radio" id="cc" name="payment" defaultChecked className="accent-[var(--color-primary)] w-4 h-4" />
                              <label htmlFor="cc" className="font-bold">Credit Card</label>
                            </div>
                            <input type="text" placeholder="Card Number" className="w-full border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            <div className="flex gap-4">
                              <input type="text" placeholder="MM/YY" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                              <input type="text" placeholder="CVC" className="w-1/2 border border-[var(--color-outline-variant)] p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            </div>
                          </div>
                        )}

                        <button 
                          onClick={handleNext}
                          disabled={isProcessing}
                          className="mt-6 w-full bg-[var(--color-primary)] text-white py-4 font-[var(--font-family-label-caps)] text-[14px] uppercase hover:bg-[var(--color-surface-tint)] transition-colors tracking-widest disabled:opacity-70 flex justify-center items-center h-14 cursor-pointer"
                        >
                          {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : step.id === 3 ? "Pay Now" : "Continue"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right: Order Summary (Sticky) */}
        <div className="w-full lg:w-[40%] bg-[var(--color-surface-container-low)] p-8 self-start sticky top-24 border border-[var(--color-outline-variant)]/50 rounded-lg">
          <h2 className="font-[var(--font-family-headline-md)] text-xl text-[var(--color-primary)] mb-8">Order Summary</h2>
          
          <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
            {cartItems.length === 0 ? (
              <p className="text-[var(--color-outline)] text-sm">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-[var(--color-surface-container-high)] relative rounded overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute -top-2 -right-2 bg-[var(--color-outline)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">{item.quantity}</span>
                    </div>
                    <div>
                      <p className="font-[var(--font-family-body-md)] font-bold text-[14px] text-[var(--color-primary)] line-clamp-1">{item.name}</p>
                      <p className="font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)] mt-1">{item.size}</p>
                    </div>
                  </div>
                  <span className="font-[var(--font-family-price-display)] text-[14px] text-[var(--color-primary)]">Rs. {item.price * item.quantity}.00</span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-[var(--color-outline-variant)] pt-6 flex flex-col gap-3 mb-6">
            <div className="flex justify-between text-sm text-[var(--color-outline)]">
              <span>Subtotal</span>
              <span>Rs. {cartTotal}.00</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--color-outline)]">
              <span>Shipping</span>
              <span>{cartTotal > 0 ? `Rs. ${shippingCost}.00` : '—'}</span>
            </div>
          </div>
          
          <div className="border-t border-[var(--color-outline-variant)] pt-6 flex justify-between items-end">
            <span className="font-[var(--font-family-headline-md)] text-xl text-[var(--color-primary)]">Total</span>
            <div className="text-right">
              <span className="text-[10px] text-[var(--color-outline)] block uppercase tracking-widest mb-1">Including Taxes</span>
              <span className="font-[var(--font-family-price-display)] text-3xl text-[var(--color-primary)]">Rs. {grandTotal}.00</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
