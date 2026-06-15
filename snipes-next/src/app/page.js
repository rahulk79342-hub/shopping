"use client";
import HeroCarousel from '@/components/HeroCarousel';
import CollectionsList from '@/components/CollectionsList';
import ProductGrid from '@/components/ProductGrid';
import ProductCarousel from '@/components/ProductCarousel';
import GoogleReviews from '@/components/GoogleReviews';
import InstagramFeed from '@/components/InstagramFeed';
<<<<<<< HEAD
import StoreLocatorBanner from '@/components/StoreLocatorBanner';
import Benefits from '@/components/Benefits';
import Newsletter from "@/components/Newsletter";
=======
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
import PressMentions from '@/components/PressMentions';
import LoyaltyTeaser from '@/components/LoyaltyTeaser';
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
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden bg-white">
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />

<<<<<<< HEAD
      {/* 2. Collections List */}
      <CollectionsList />

      {/* 3. Snipes Picks (Product Grid) */}
      <ProductGrid title="Snipes Picks" viewAllLink="/collections/new-arrivals" />
=======
      {/* Press & Media Mentions */}
      <PressMentions />

      {/* Recently Viewed (Sticky on Mobile, Row on Desktop) */}
      <RecentlyViewed />

      {/* Featured Categories (Desktop visual tiles / Mobile icon pills) */}
      <FeaturedCategories />

      {/* Featured Collections (Editorial splits) */}
      <FeaturedCollections />
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

      {/* 4. Google Reviews Widget */}
      <GoogleReviews />

<<<<<<< HEAD
      {/* 5. Instagram Feed */}
      <InstagramFeed />

      {/* 6. Store Locator Banner */}
      <StoreLocatorBanner />

      {/* 7. Shirts Grid */}
      <ProductGrid title="Shirts" viewAllLink="/collections/casuals" />

      {/* 8. Gurkha Pants Slider */}
      <ProductCarousel title="Gurkha Pants" viewAllLink="/collections/gurkha-pants" />

      {/* 9. T Shirts Grid */}
      <ProductGrid title="T Shirts" viewAllLink="/collections/t-shirts" />

      {/* 10. Features/Trust Bar */}
=======
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

      {/* Loyalty Programme Teaser */}
      <LoyaltyTeaser />

      {/* USP / Benefits Section */}
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
      <Benefits />

      {/* 11. Newsletter */}
      <Newsletter />
    </main>
  );
}
