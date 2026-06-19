"use client";
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPaymentIntent, createOrder } from '@/app/actions/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { MdOutlineLock, MdOutlineCreditCard, MdOutlineQrCodeScanner, MdOutlineShield, MdOutlineRefresh, MdOutlineSearch, MdOutlineCheckCircle, MdOutlineLocationOn, MdOutlineLocalShipping } from 'react-icons/md';
import { FaApple } from 'react-icons/fa';


// Initialize Stripe (use mock key if env var is missing)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51MockPublishableKey00000000000000000000000000000000000000000000000000000000000000000000000000');

// Mock Addresses for Autocomplete
const MOCK_ADDRESSES = [
  "123 Main Street, New York, NY 10001",
  "456 Park Avenue, New York, NY 10022",
  "789 Silicon Valley Blvd, San Jose, CA 95110",
  "10 Downing Street, London, UK",
  "1 Infinite Loop, Cupertino, CA 95014",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
  "350 5th Ave, New York, NY 10118"
];

function CheckoutForm({ clientSecret, totalAmount, onSuccess, paymentGateway }) {
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
          <FaApple className="text-[16px]" /> Pay
        </button>
        <button type="button" className="flex-1 bg-white text-black border border-black py-3 rounded-[var(--border-radius-sm)] flex items-center justify-center gap-2 font-[var(--font-family-label-caps)] text-[12px] uppercase">
          Google Pay
        </button>
      </div>

      {/* Conditional Rendering based on selected Gateway */}
      {paymentGateway === 'stripe' && (
        <div className="relative animate-fade-in">
          {/* If no real key, show a highly styled Mock UI instead of PaymentElement which will fail to mount */}
          {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
            <div className="space-y-4">
               <p className="text-[12px] text-[var(--color-outline)] font-bold mb-2 flex items-center gap-2">
                 <MdOutlineLock className="text-[16px] text-green-500" /> SECURE CARD PAYMENT (MOCK)
               </p>
               <div className="relative">
                 <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px] pl-10" />
                 <MdOutlineCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)]" />
               </div>
               <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" className="w-1/2 border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px]" />
                  <input type="text" placeholder="CVC" className="w-1/2 border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px]" />
               </div>
            </div>
          ) : (
            <PaymentElement />
          )}
        </div>
      )}

      {paymentGateway === 'razorpay_upi' && (
        <div className="space-y-4 animate-fade-in border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-6 bg-[var(--color-surface-container-low)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-[var(--font-family-body-md)] font-bold flex items-center gap-2">
              <MdOutlineQrCodeScanner className="text-[#3399cc]" /> Pay via UPI
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded">GPay</span>
              <span className="text-[10px] font-bold bg-[#5f259f] text-white px-2 py-1 rounded">PhonePe</span>
            </div>
          </div>
          <div className="relative">
            <input type="text" placeholder="Enter UPI ID (e.g., username@upi)" className="w-full border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px] focus:border-[var(--color-primary)] outline-none" />
          </div>
          <p className="text-[11px] text-[var(--color-outline)] mt-2">A payment request will be sent to your UPI app.</p>
        </div>
      )}

      {paymentGateway === 'simpl' && (
        <div className="space-y-4 animate-fade-in border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-6 bg-[#00D1B2]/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-[var(--font-family-body-md)] font-bold flex items-center gap-2 text-[#00D1B2]">
               Simpl Pay Later
            </p>
            <span className="bg-[#00D1B2] text-white text-[10px] font-bold px-2 py-1 rounded-sm">simpl</span>
          </div>
          <p className="text-[13px] font-[var(--font-family-body-md)] mb-4">Pay in 3 parts of <strong className="font-bold">Rs. {(totalAmount / 3).toFixed(2)}</strong> over 2 months. No hidden fees.</p>
          <div className="relative">
            <input type="tel" placeholder="Enter mobile number linked to Simpl" className="w-full border border-[#00D1B2]/30 p-3 rounded-[var(--border-radius-sm)] text-[14px] focus:border-[#00D1B2] outline-none bg-white" />
          </div>
          <p className="text-[11px] text-[var(--color-outline)] mt-2">We&apos;ll send an OTP to verify your account.</p>
        </div>
      )}

      {paymentGateway === 'razorpay_emi' && (
        <div className="space-y-4 animate-fade-in border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-6 bg-[#3399cc]/5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-[var(--font-family-body-md)] font-bold flex items-center gap-2 text-[#3399cc]">
              Razorpay Credit Card EMI
            </p>
            <span className="text-[10px] font-bold bg-[#3399cc] text-white px-2 py-1 rounded">0% Interest</span>
          </div>
          
          <select className="w-full border border-[#3399cc]/30 p-3 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:border-[#3399cc] outline-none bg-white cursor-pointer mb-4">
            <option value="">Select EMI Tenure</option>
            <option value="3">3 Months x Rs. {(totalAmount / 3).toFixed(2)} / mo (0% interest)</option>
            <option value="6">6 Months x Rs. {(totalAmount / 6).toFixed(2)} / mo (0% interest)</option>
            <option value="12">12 Months x Rs. {((totalAmount * 1.05) / 12).toFixed(2)} / mo (5% interest)</option>
          </select>
          
          <div className="flex gap-2">
            <input type="text" placeholder="Card Number to check eligibility" className="flex-grow border border-[#3399cc]/30 p-3 rounded-[var(--border-radius-sm)] text-[14px] focus:border-[#3399cc] outline-none bg-white" />
            <button type="button" onClick={(e) => { e.preventDefault(); alert("You are eligible for 0% EMI!"); }} className="bg-[#3399cc] text-white px-4 text-[12px] font-[var(--font-family-label-caps)] uppercase tracking-widest rounded-[var(--border-radius-sm)] hover:bg-[#3399cc]/90 transition-colors">Check</button>
          </div>
          <p className="text-[10px] text-[var(--color-outline)] mt-2 flex items-center gap-1"><MdOutlineShield className="text-[14px]" /> No hard credit pull for eligibility check.</p>
        </div>
      )}

      {paymentGateway === 'klarna' && (
        <div className="space-y-4 animate-fade-in border border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-6 bg-[#FFB3C7]/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-[var(--font-family-body-md)] font-bold flex items-center gap-2 text-black">
               Klarna.
            </p>
            <span className="bg-[#FFB3C7] text-black text-[10px] font-bold px-2 py-1 rounded-sm">International</span>
          </div>
          <p className="text-[13px] font-[var(--font-family-body-md)] mb-4 text-[var(--color-outline)]">Pay in 4 interest-free payments of <strong className="font-bold text-black">Rs. {(totalAmount / 4).toFixed(2)}</strong>.</p>
          <div className="bg-white p-4 border border-[#FFB3C7] rounded-[var(--border-radius-sm)] flex justify-between items-center text-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-black mb-1">Today</span>
              <span className="text-[12px] font-[var(--font-family-price-display)]">Rs. {(totalAmount / 4).toFixed(2)}</span>
            </div>
            <div className="flex flex-col opacity-50">
              <span className="text-[10px] font-bold text-black mb-1">2 Weeks</span>
              <span className="text-[12px] font-[var(--font-family-price-display)]">Rs. {(totalAmount / 4).toFixed(2)}</span>
            </div>
            <div className="flex flex-col opacity-50">
              <span className="text-[10px] font-bold text-black mb-1">4 Weeks</span>
              <span className="text-[12px] font-[var(--font-family-price-display)]">Rs. {(totalAmount / 4).toFixed(2)}</span>
            </div>
            <div className="flex flex-col opacity-50">
              <span className="text-[10px] font-bold text-black mb-1">6 Weeks</span>
              <span className="text-[12px] font-[var(--font-family-price-display)]">Rs. {(totalAmount / 4).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-[11px] text-[var(--color-outline)] mt-2">You will be redirected to Klarna to complete your purchase securely.</p>
        </div>
      )}

      {message && <div className="text-[var(--color-error)] text-sm mt-4 p-3 bg-red-50 rounded-sm">{message}</div>}

      <button 
        disabled={isProcessing || (paymentGateway === 'stripe' && (!stripe || !elements))}
        className="w-full mt-8 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[14px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] hover:bg-black/90 transition-all active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg"
      >
        {isProcessing ? (
          <><MdOutlineRefresh className="animate-spin text-[18px]" /> Processing...</>
        ) : (
          <><MdOutlineLock className="text-[18px]" /> Pay Rs. {totalAmount}.00</>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { cartItems, cartTotal: getCartTotal, clearCart } = useCartStore();
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
  const [paymentGateway, setPaymentGateway] = useState('stripe'); // 'stripe' or 'razorpay'

  useEffect(() => setMounted(true), []);

  const cartTotal = getCartTotal();

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
      mode: checkoutMode,
      paymentMethod: paymentGateway
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
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)] uppercase" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "-1px" }}>
          SNIPES
        </Link>
        <div className="flex items-center gap-2 text-[var(--color-outline)]">
          <MdOutlineLock className="text-[16px]" />
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
                 <MdOutlineSearch className="text-[var(--color-outline)] ml-2" />
                 <input 
                   type="text" 
                   value={addressSearch}
                   onChange={(e) => {
                     setAddressSearch(e.target.value);
                     setSelectedAddress(e.target.value);
                     setShowAddressSuggestions(e.target.value.length > 2);
                   }}
                   placeholder="Start typing your address..." 
                   className="w-full p-2 text-[14px] font-[var(--font-family-body-md)] focus:outline-none"
                 />
                 {selectedAddress && selectedAddress.length > 5 && (
                   <MdOutlineCheckCircle className="text-green-600 mr-2" />
                 )}
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
                        <MdOutlineLocationOn className="text-[16px] text-[var(--color-outline)]" />
                        {address}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {selectedAddress && (
               <div className="mt-4 p-4 bg-[var(--color-surface-container-low)] border border-green-200 rounded-[var(--border-radius-sm)] flex items-start gap-3 animate-fade-in shadow-sm">
                 <MdOutlineLocalShipping className="text-green-600" />
                 <div>
                   <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Shipping Destination Confirmed</p>
                   <p className="font-[var(--font-family-body-md)] text-[14px] text-[var(--color-primary)] font-bold">{selectedAddress}</p>
                 </div>
                 <button onClick={() => { setSelectedAddress(''); setAddressSearch(''); }} className="ml-auto text-[12px] text-[var(--color-outline)] underline hover:text-[var(--color-primary)]">Edit</button>
               </div>
            )}
          </div>

          {/* Payment Section */}
          {clientSecret && email && selectedAddress && selectedAddress.length > 5 ? (
            <div className="mt-8 animate-fade-in">
              {/* Payment Tabs - Scrollable for BNPL options */}
              <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
                <button 
                  onClick={() => setPaymentGateway('stripe')}
                  className={`flex-shrink-0 min-w-[120px] py-3 flex flex-col items-center justify-center gap-1 rounded-[var(--border-radius-sm)] transition-all border-2 ${paymentGateway === 'stripe' ? 'border-blue-600 bg-blue-50' : 'border-[var(--color-outline-variant)] bg-white shadow-sm hover:border-blue-300'}`}
                >
                  <span className="font-bold text-blue-600 text-[13px]">Stripe</span>
                  <span className="text-[9px] text-[var(--color-outline)]">Cards / Apple Pay</span>
                </button>
                <button 
                  onClick={() => setPaymentGateway('razorpay_upi')}
                  className={`flex-shrink-0 min-w-[120px] py-3 flex flex-col items-center justify-center gap-1 rounded-[var(--border-radius-sm)] transition-all border-2 ${paymentGateway === 'razorpay_upi' ? 'border-cyan-600 bg-cyan-50' : 'border-[var(--color-outline-variant)] bg-white shadow-sm hover:border-cyan-300'}`}
                >
                  <span className="font-bold text-cyan-600 text-[13px]">Razorpay UPI</span>
                  <span className="text-[9px] text-[var(--color-outline)]">GPay / PhonePe</span>
                </button>
                <button 
                  onClick={() => setPaymentGateway('simpl')}
                  className={`flex-shrink-0 min-w-[120px] py-3 flex flex-col items-center justify-center gap-1 rounded-[var(--border-radius-sm)] transition-all border-2 ${paymentGateway === 'simpl' ? 'border-teal-500 bg-teal-50' : 'border-[var(--color-outline-variant)] bg-white shadow-sm hover:border-teal-300'}`}
                >
                  <span className="font-bold text-teal-500 text-[13px]">Simpl</span>
                  <span className="text-[9px] text-[var(--color-outline)]">Pay in 3 Parts</span>
                </button>
                <button 
                  onClick={() => setPaymentGateway('razorpay_emi')}
                  className={`flex-shrink-0 min-w-[120px] py-3 flex flex-col items-center justify-center gap-1 rounded-[var(--border-radius-sm)] transition-all border-2 ${paymentGateway === 'razorpay_emi' ? 'border-cyan-600 bg-cyan-50' : 'border-[var(--color-outline-variant)] bg-white shadow-sm hover:border-cyan-300'}`}
                >
                  <span className="font-bold text-cyan-600 text-[13px]">EMI</span>
                  <span className="text-[9px] text-[var(--color-outline)]">0% Interest</span>
                </button>
                <button 
                  onClick={() => setPaymentGateway('klarna')}
                  className={`flex-shrink-0 min-w-[120px] py-3 flex flex-col items-center justify-center gap-1 rounded-[var(--border-radius-sm)] transition-all border-2 ${paymentGateway === 'klarna' ? 'border-pink-300 bg-pink-50' : 'border-[var(--color-outline-variant)] bg-white shadow-sm hover:border-pink-200'}`}
                >
                  <span className="font-bold text-black text-[13px]">Klarna.</span>
                  <span className="text-[9px] text-[var(--color-outline)]">Intl. Pay in 4</span>
                </button>
              </div>

              <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} totalAmount={cartTotal} onSuccess={handlePaymentSuccess} paymentGateway={paymentGateway} />
              </Elements>
            </div>
          ) : (
            <div className="mt-8">
              <button 
                onClick={() => {
                  if (!email) alert("Please enter your email address.");
                  else if (!selectedAddress || selectedAddress.length <= 5) alert("Please enter a valid shipping address.");
                }}
                className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[14px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] transition-all flex items-center justify-center gap-2 shadow-lg opacity-50 cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
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
