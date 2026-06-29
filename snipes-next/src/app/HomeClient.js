"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Eager imports for above-the-fold
import HeroCarousel from '@/components/HeroCarousel';
import BrandMarquee from '@/components/BrandMarquee';
import TheVault from '@/components/TheVault';
import ExitIntentPopup from '@/components/ExitIntentPopup';

// Lazy imports for below-the-fold components to reduce initial JS payload
const FeaturedCategories = dynamic(() => import('@/components/FeaturedCategories'), { ssr: true });
const EditorialSpotlight = dynamic(() => import('@/components/EditorialSpotlight'), { ssr: true });
const RecentlyViewed = dynamic(() => import('@/components/RecentlyViewed'), { ssr: false });
const FeaturedCollections = dynamic(() => import('@/components/FeaturedCollections'), { ssr: true });
const Craftsmanship = dynamic(() => import('@/components/Craftsmanship'), { ssr: true });
const TheCulture = dynamic(() => import('@/components/TheCulture'), { ssr: true });
const ProductShowcase = dynamic(() => import('@/components/ProductShowcase'), { ssr: true });
const BestsellersCarousel = dynamic(() => import('@/components/BestsellersCarousel'), { ssr: true });
const AIPersonalizedFeed = dynamic(() => import('@/components/AIPersonalizedFeed'), { ssr: false });
const PersonalisedRecommendations = dynamic(() => import('@/components/PersonalisedRecommendations'), { ssr: false });
const StyleQuiz = dynamic(() => import('@/components/StyleQuiz'), { ssr: true });
const ShoppableLookbook = dynamic(() => import('@/components/ShoppableLookbook'), { ssr: true });
const CountdownDrop = dynamic(() => import('@/components/CountdownDrop'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const InstagramFeed = dynamic(() => import('@/components/InstagramFeed'), { ssr: true });
const EliteVIP = dynamic(() => import('@/components/EliteVIP'), { ssr: true });
const Benefits = dynamic(() => import('@/components/Benefits'), { ssr: true });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: true });

export default function HomeClient({ initialBestsellers }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [bestsellers, setBestsellers] = useState(initialBestsellers || []);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited_snipes');
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      localStorage.setItem('hasVisited_snipes', 'true');
    }
    // Note: data is now fetched on the server in page.js, so we just use the initial props.
  }, []);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  return (
    <main className="w-full bg-[var(--color-background)] overflow-x-hidden">
      <ExitIntentPopup />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* New Professional Sliding Hero Carousel */}
      <HeroCarousel />

      {/* Premium Brands Marquee */}
      <BrandMarquee />

      {/* The Vault - Exclusive Drops */}
      <TheVault />

      {/* Featured Categories (Desktop visual tiles / Mobile icon pills) */}
      <FeaturedCategories />

      {/* Editorial Spotlight */}
      <EditorialSpotlight />

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Featured Collections (Editorial splits) */}
      <FeaturedCollections />

      {/* Premium Craftsmanship Section */}
      <Craftsmanship />

      {/* The Culture (Text Reveal) */}
      <TheCulture />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Bestsellers Carousel (Embla + Sanity) */}
      <BestsellersCarousel products={bestsellers} />

      {/* AI-Powered Recommendations (Standard) */}
      <PersonalisedRecommendations />

      {/* Advanced AI Bento Grid Feed */}
      <AIPersonalizedFeed />

      {/* Interactive Style Quiz CTA */}
      <StyleQuiz />

      {/* Shoppable Lookbook Editorial */}
      <ShoppableLookbook />

      {/* Live Drop / Countdown */}
      <CountdownDrop />

      {/* Testimonials */}
      <Testimonials />

      {/* Instagram Feed Integration */}
      <InstagramFeed />

      {/* Elite VIP Club */}
      <EliteVIP />

      {/* USP / Benefits Section */}
      <Benefits />

      {/* Newsletter Signup */}
      <Newsletter />

    </main>
  );
}
