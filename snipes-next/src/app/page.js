"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import BestsellersCarousel from '@/components/BestsellersCarousel';
import HeroCarousel from '@/components/HeroCarousel';
import InstagramFeed from '@/components/InstagramFeed';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import ProductShowcase from '@/components/ProductShowcase';
import Testimonials from '@/components/Testimonials';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedCollections from '@/components/FeaturedCollections';
import PersonalisedRecommendations from '@/components/PersonalisedRecommendations';
import StyleQuiz from '@/components/StyleQuiz';
import ShoppableLookbook from '@/components/ShoppableLookbook';
import CountdownDrop from '@/components/CountdownDrop';
import RecentlyViewed from '@/components/RecentlyViewed';
import BrandMarquee from '@/components/BrandMarquee';
import Craftsmanship from '@/components/Craftsmanship';
import TheVault from '@/components/TheVault';
import EditorialSpotlight from '@/components/EditorialSpotlight';
import TheCulture from '@/components/TheCulture';
import EliteVIP from '@/components/EliteVIP';
import { getBestsellers } from '@/lib/sanity';
import { useCurrency } from '@/hooks/useCurrency';
import Newsletter from "@/components/Newsletter";
import Benefits from "@/components/Benefits";
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion';

// Start of Home component

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const [bestsellers, setBestsellers] = useState([]);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited_snipes');
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      localStorage.setItem('hasVisited_snipes', 'true');
    }

    async function loadData() {
      const data = await getBestsellers();
      setBestsellers(data);
    }
    loadData();
  }, []);

  const heroImageY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroTextY = useTransform(scrollY, [0, 1000], [0, -100]); // Less extreme for mobile
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

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

      {/* Press & Media Mentions */}


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

      {/* AI-Powered Recommendations */}
      <PersonalisedRecommendations />

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
