"use client";
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import { MdOutlineVerified, MdOutlineLocalShipping, MdOutlineReceiptLong, MdOutlineLocationOn } from 'react-icons/md';


function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-UNKNOWN';
  
  const [mounted, setMounted] = useState(false);
  const [confettiData, setConfettiData] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Fetch a highly-rated free confetti animation from LottieFiles CDN (or use a local fallback)
    fetch('https://assets10.lottiefiles.com/packages/lf20_u4yrau.json')
      .then(res => res.json())
      .then(data => setConfettiData(data))
      .catch(err => console.error("Failed to load confetti", err));
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Full-screen Lottie Overlay */}
      {confettiData && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-start justify-center overflow-hidden">
          <Lottie 
            animationData={confettiData} 
            loop={false}
            className="w-full h-full max-w-[800px] -mt-20 opacity-80"
          />
        </div>
      )}

      {/* Main Confirmation Card */}
      <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[var(--border-radius-lg)] shadow-2xl border border-[var(--color-outline-variant)] relative z-10 text-center">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <MdOutlineVerified className="text-[40px] text-green-600" />
        </div>
        
        <h1 className="font-[var(--font-family-headline-lg)] text-4xl mb-2 text-[var(--color-primary)]">It&apos;s Official.</h1>
        <p className="font-[var(--font-family-body-lg)] text-[var(--color-outline)] mb-8">
          Your order has been placed successfully.<br/>
          We&apos;ve sent a confirmation email and SMS to you.
        </p>

        <div className="bg-[var(--color-surface-container-low)] p-6 rounded-[var(--border-radius-md)] text-left mb-8 border border-dashed border-[var(--color-outline-variant)]">
          <p className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-outline)] mb-1">Order Number</p>
          <p className="font-[var(--font-family-headline-md)] text-2xl text-[var(--color-primary)] mb-4">{orderId}</p>
          
          <div className="flex items-center gap-3 text-[14px] text-[var(--color-outline)] mb-2">
            <MdOutlineLocalShipping className="text-[18px]" />
            Estimated Delivery: <strong>3 - 5 Business Days</strong>
          </div>
          
          <div className="flex items-center gap-3 text-[14px] text-[var(--color-outline)]">
            <MdOutlineReceiptLong className="text-[18px]" />
            A detailed receipt is in your inbox.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link href={`/track/${orderId}`} className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase py-4 tracking-widest hover:bg-[var(--color-surface-tint)] transition-colors rounded-[var(--border-radius-sm)] flex items-center justify-center gap-2">
            <MdOutlineLocationOn className="text-[16px]" />
            Track Order
          </Link>
          
          <Link href="/discover" className="w-full bg-white text-[var(--color-primary)] border border-[var(--color-outline-variant)] font-[var(--font-family-label-caps)] text-[12px] uppercase py-4 tracking-widest hover:bg-[var(--color-surface-container)] transition-colors rounded-[var(--border-radius-sm)] block text-center">
            Continue Shopping
          </Link>
        </div>

      </div>
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] relative overflow-hidden flex flex-col items-center pt-20 md:pt-32 px-4 pb-20">
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-background)]"></div>}>
        <OrderSuccessContent />
      </Suspense>
    </main>
  );
}
