"use client";
import HeroCarousel from '@/components/HeroCarousel';
import CollectionsList from '@/components/CollectionsList';
import ProductGrid from '@/components/ProductGrid';
import ProductCarousel from '@/components/ProductCarousel';
import GoogleReviews from '@/components/GoogleReviews';
import InstagramFeed from '@/components/InstagramFeed';
import StoreLocatorBanner from '@/components/StoreLocatorBanner';
import Benefits from '@/components/Benefits';
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden bg-white">
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Collections List */}
      <CollectionsList />

      {/* 3. Snipes Picks (Product Grid) */}
      <ProductGrid title="Snipes Picks" viewAllLink="/collections/new-arrivals" />

      {/* 4. Google Reviews Widget */}
      <GoogleReviews />

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
      <Benefits />

      {/* 11. Newsletter */}
      <Newsletter />
    </main>
  );
}
