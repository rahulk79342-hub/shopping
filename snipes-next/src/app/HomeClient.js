"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';

// Eager imports for above-the-fold
import CinematicHero from '@/components/CinematicHero';
import ShimmerMarquee from '@/components/ShimmerMarquee';
import HolographicSneakerLab from '@/components/HolographicSneakerLab';
import TheVault from '@/components/TheVault';
import ExitIntentPopup from '@/components/ExitIntentPopup';

// Lazy imports for below-the-fold premium components
const PressMentions = dynamic(() => import('@/components/PressMentions'), { ssr: true });
const ARVirtualTryOnShowcase = dynamic(() => import('@/components/ARVirtualTryOnShowcase'), { ssr: true });
const ShoppableLiveStream = dynamic(() => import('@/components/ShoppableLiveStream'), { ssr: true });
const OutfitBuilder = dynamic(() => import('@/components/OutfitBuilder'), { ssr: true });
const ShoppableLookbook = dynamic(() => import('@/components/ShoppableLookbook'), { ssr: true });
const AIPersonalizedFeed = dynamic(() => import('@/components/AIPersonalizedFeed'), { ssr: false });
const AITrendForecaster = dynamic(() => import('@/components/AITrendForecaster'), { ssr: true });
const CountdownDrop = dynamic(() => import('@/components/CountdownDrop'), { ssr: true });
const EliteVIP = dynamic(() => import('@/components/EliteVIP'), { ssr: true });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: true });

const mockOutfitData = {
  tops: [
    { id: 1, name: 'Boxy Heavyweight Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Tech Zip Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Vintage Wash Crewneck', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop' }
  ],
  bottoms: [
    { id: 1, name: 'Cargo Parachute Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Baggy Denim Jeans', image: 'https://images.unsplash.com/photo-1542272604-780c823d51ce?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Nylon Track Pants', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=400&auto=format&fit=crop' }
  ]
};

export default function HomeClient({ initialBestsellers }) {
  const { scrollYProgress } = useScroll();
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited_snipes');
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      localStorage.setItem('hasVisited_snipes', 'true');
    }
  }, []);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  return (
    <main className="w-full bg-[#020202] text-white overflow-x-hidden">
      <ExitIntentPopup />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* 1. Ultra-Premium Cinematic Hero */}
      <CinematicHero />

      {/* 2. Premium Brands & Social Proof */}
      <ShimmerMarquee />
      <PressMentions />

      {/* 3. Advanced Premium Section: Holographic Sneaker Lab */}
      <HolographicSneakerLab />

      {/* 4. NEW: AR Virtual Try-On Showcase */}
      <ARVirtualTryOnShowcase />

      {/* 5. Shoppable Live Stream Commerce */}
      <ShoppableLiveStream />

      {/* 6. The Vault - Exclusive Drops */}
      <TheVault />

      {/* 7. Interactive Lookbook (Mix & Match) */}
      <OutfitBuilder data={mockOutfitData} />

      {/* 8. Shoppable Lookbook Editorial */}
      <ShoppableLookbook />

      {/* 9. Advanced AI Bento Grid Feed */}
      <AIPersonalizedFeed />

      {/* 10. AI Trend Forecaster */}
      <AITrendForecaster />

      {/* 11. Live Drop / Countdown */}
      <CountdownDrop />

      {/* 12. Elite VIP Club */}
      <EliteVIP />

      {/* 13. Newsletter Signup */}
      <Newsletter />
    </main>
  );
}
