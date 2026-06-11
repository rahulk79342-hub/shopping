"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPaymentIntent, createOrder } from '@/app/actions/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe (use mock key if env var is missing)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

// Mock Addresses for Autocomplete
const MOCK_ADDRESSES = [
  "123 Main Street, New York, NY 10001",
  "456 Park Avenue, New York, NY 10022",
  "789 Silicon Valley Blvd, San Jose, CA 95110",
  "10 Downing Street, London, UK",
  "1 Infinite Loop, Cupertino, CA 95014"
];

function CheckoutForm({ clientSecret, totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // If using mock keys, bypass Stripe processing and simulate success
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
       console.log("[Mock Stripe] Simulating payment processing...");
       setTimeout(() => {
         setIsProcessing(false);
         onSuccess();
       }, 2000);
       return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required', // Avoid redirect for SPA feel if possible
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
    } else {
      // Payment succeeded!
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
      <h3 className="font-[var(--font-family-headline-md)] text-lg mb-6">Payment Method</h3>
      
      {/* Mock Express Checkout Buttons */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-[var(--color-outline-variant)]">
        <button type="button" className="flex-1 bg-black text-white py-3 rounded-[var(--border-radius-sm)] flex items-center justify-center gap-2 font-[var(--font-family-label-caps)] text-[12px] uppercase">
          <span className="material-symbols-outlined text-[16px]">apple</span> Pay
        </button>
        <button type="button" className="flex-1 bg-white text-black border border-black py-3 rounded-[var(--border-radius-sm)] flex items-center justify-center gap-2 font-[var(--font-family-label-caps)] text-[12px] uppercase">
          Google Pay
        </button>
      </div>

      <div className="relative">
        {/* If no real key, show a highly styled Mock UI instead of PaymentElement which will fail to mount */}
        {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
          <div className="space-y-4">
             <p className="text-[12px] text-[var(--color-outline)] font-bold mb-2">MOCK STRIPE ELEMENT</p>
             <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px]" />
             <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="w-1/2 border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px]" />
                <input type="text" placeholder="CVC" className="w-1/2 border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px]" />
             </div>
          </div>
        ) : (
          <PaymentElement />
        )}
      </div>

      {message && <div className="text-[var(--color-error)] text-sm mt-4">{message}</div>}

      <button 
        disabled={isProcessing || !stripe || !elements}
        className="w-full mt-8 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[14px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] hover:bg-black/90 transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay Rs. ${totalAmount}.00`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  
  const [checkoutMode, setCheckoutMode] = useState('guest'); // 'guest' or 'account'
  
  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Only used if creating account
  const [addressSearch, setAddressSearch] = useState('');
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  
  // Payment State
  const [clientSecret, setClientSecret] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Only fetch PaymentIntent if we have items
    if (cartItems.length > 0 && cartTotal > 0 && mounted) {
      const initPayment = async () => {
        const res = await createPaymentIntent(cartTotal);
        if (res.clientSecret) {
          setClientSecret(res.clientSecret);
        }
      };
      initPayment();
    }
  }, [cartTotal, cartItems.length, mounted]);

  const handleAddressSelect = (address) => {
    setAddressSearch(address);
    setSelectedAddress(address);
    setShowAddressSuggestions(false);
  };

  const handlePaymentSuccess = async () => {
    // 1. Create order in Supabase via Server Action
    const res = await createOrder({
      email,
      address: selectedAddress,
      items: cartItems,
      total: cartTotal,
      mode: checkoutMode
    });

    if (res.success) {
      // Trigger notifications
      fetch('/api/notifications/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: res.orderId,
          email,
          phone,
          items: cartItems,
          total: cartTotal,
          address: selectedAddress
        })
      }).catch(err => console.error("Notification trigger failed:", err));

      clearCart();
      
      // Redirect to the dedicated success page
      router.push(`/checkout/success?orderId=${res.orderId}`);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--color-background)]"></div>;

  return (
    <main className="min-h-screen bg-[var(--color-surface)] pb-24">
      {/* Checkout Header */}
      <header className="bg-white border-b border-[var(--color-outline-variant)] py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)]">
          DEMO
        </Link>
        <div className="flex items-center gap-2 text-[var(--color-outline)]">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest">Secure Checkout</span>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12 flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Forms */}
        <div className="w-full lg:w-[55%]">
          
          {/* Guest vs Account Toggle */}
          <div className="bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[var(--font-family-headline-md)] text-xl">Contact Information</h2>
              <span className="font-[var(--font-family-body-md)] text-[12px] text-[var(--color-outline)]">
                {checkoutMode === 'guest' ? 'Checking out as Guest' : 'Creating Account'}
              </span>
            </div>

            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setCheckoutMode('guest')}
                className={`flex-1 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest border transition-colors ${checkoutMode === 'guest' ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)]'}`}
              >
                Guest
              </button>
              <button 
                onClick={() => setCheckoutMode('account')}
                className={`flex-1 py-3 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest border transition-colors ${checkoutMode === 'account' ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)]'}`}
              >
                Create Account
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)] mb-4"
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (For shipping updates)" 
                  className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              
              <AnimatePresence>
                {checkoutMode === 'account' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create Password" 
                      className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)] mt-4"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
            <h2 className="font-[var(--font-family-headline-md)] text-xl mb-6">Shipping Address</h2>
            
            <div className="relative">
              <div className="flex items-center border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-2 focus-within:border-[var(--color-primary)] transition-colors">
                 <span className="material-symbols-outlined text-[var(--color-outline)] ml-2">search</span>
                 <input 
                   type="text" 
                   value={addressSearch}
                   onChange={(e) => {
                     setAddressSearch(e.target.value);
                     setShowAddressSuggestions(e.target.value.length > 0);
                   }}
                   placeholder="Start typing your address..." 
                   className="w-full p-2 text-[14px] font-[var(--font-family-body-md)] focus:outline-none"
                 />
              </div>

              {/* Mock Google Places Autocomplete Dropdown */}
              <AnimatePresence>
                {showAddressSuggestions && (
                  <motion.ul 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] shadow-xl overflow-hidden"
                  >
                    {MOCK_ADDRESSES.filter(a => a.toLowerCase().includes(addressSearch.toLowerCase())).map((address, idx) => (
                      <li 
                        key={idx}
                        onClick={() => handleAddressSelect(address)}
                        className="p-3 text-[13px] font-[var(--font-family-body-md)] hover:bg-[var(--color-surface-container)] cursor-pointer border-b border-[var(--color-outline-variant)] last:border-b-0 flex items-center gap-3"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[var(--color-outline)]">location_on</span>
                        {address}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {selectedAddress && (
               <div className="mt-4 p-4 bg-[var(--color-surface-container-low)] border border-green-200 rounded-[var(--border-radius-sm)] flex items-start gap-3">
                 <span className="material-symbols-outlined text-green-600">check_circle</span>
                 <div>
                   <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Verified Address</p>
                   <p className="font-[var(--font-family-body-md)] text-[14px]">{selectedAddress}</p>
                 </div>
               </div>
            )}
          </div>

          {/* Payment Section */}
          {clientSecret && email && selectedAddress && (
            <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} totalAmount={cartTotal} onSuccess={handlePaymentSuccess} />
            </Elements>
          )}

        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="w-full lg:w-[45%]">
          <div className="bg-white p-6 md:p-8 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm sticky top-32">
            <h2 className="font-[var(--font-family-headline-md)] text-xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-[var(--color-surface-container)] relative rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <div className="absolute -top-2 -right-2 bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow justify-center">
                    <h4 className="font-[var(--font-family-body-md)] font-bold text-[13px] line-clamp-1">{item.name}</h4>
                    <p className="text-[12px] text-[var(--color-outline)]">Size: {item.size}</p>
                    <p className="font-[var(--font-family-price-display)] text-[14px] mt-1">Rs. {item.price * item.quantity}.00</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[var(--color-outline-variant)] font-[var(--font-family-body-md)] text-[14px]">
              <div className="flex justify-between text-[var(--color-outline)]">
                <span>Subtotal</span>
                <span>Rs. {cartTotal}.00</span>
              </div>
              <div className="flex justify-between text-[var(--color-outline)]">
                <span>Shipping</span>
                <span>{cartTotal > 5000 ? 'Free' : 'Calculated at next step'}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-[var(--color-outline-variant)]">
                <span className="font-[var(--font-family-headline-md)] text-lg">Total</span>
                <div className="text-right">
                  <span className="text-[10px] text-[var(--color-outline)] mr-2">INR</span>
                  <span className="font-[var(--font-family-price-display)] text-[24px]">Rs. {cartTotal}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
