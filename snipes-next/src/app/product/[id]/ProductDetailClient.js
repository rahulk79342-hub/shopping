"use client";
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';
import Link from 'next/link';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useEmblaCarousel from 'embla-carousel-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useRecentStore } from '@/store/useRecentStore';
import VirtualTryOnModal from '@/components/VirtualTryOnModal';

export default function ProductDetailClient({ product, relatedProducts }) {
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartDrawer, openSizeGuide } = useUI();

  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || 'Default');
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [liveViewers, setLiveViewers] = useState(12);
  const [stockLeft, setStockLeft] = useState(8);
  const [isVTOOpen, setIsVTOOpen] = useState(false);

  const wishlistItems = useWishlistStore(state => state.wishlistItems);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isWishlisted = wishlistItems.includes(product.id);
  const { addRecent, recentProducts } = useRecentStore();

  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [recentRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  const sizes = ['S', 'M', 'L', 'XL'];

  // Supabase Realtime Simulation & Recently Viewed
  useEffect(() => {
    addRecent(product);

    const interval = setInterval(() => {
      setLiveViewers(prev => Math.max(5, prev + Math.floor(Math.random() * 5) - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, [product, addRecent]);

  // Size Picker Scarcity Simulation
  useEffect(() => {
    // Simulate stock check based on size
    const mockStockMap = { 'S': 2, 'M': 8, 'L': 0, 'XL': 15 };
    setStockLeft(mockStockMap[activeSize] || 5);
  }, [activeSize]);

  // Sticky Bar Visibility Logic
  useEffect(() => {
    const handleScroll = () => {
      const addBtn = document.getElementById('main-add-btn');
      if (addBtn) {
        const rect = addBtn.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      name: `${product.name} - ${activeColor}`,
      size: activeSize,
      image: product.media[0].url
    });
    openCartDrawer();
  };

  const handleAddRecommended = (recProduct) => {
    addToCart({ ...recProduct, size: 'M' });
    openCartDrawer();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Snipes Menswear: ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-0 md:px-[var(--spacing-margin-mobile)] py-0 md:py-[var(--spacing-stack-lg)] min-h-screen">

        <nav className="hidden md:flex items-center gap-2 font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)] mb-[var(--spacing-stack-md)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/discover" className="hover:text-[var(--color-primary)]">Collections</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[var(--color-primary)]">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-0 md:gap-[var(--spacing-stack-lg)] lg:gap-[100px]">

          {/* MEDIA GALLERY */}
          <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-4">
            <div className="aspect-[4/5] md:aspect-[3/4] bg-[var(--color-surface-container)] w-full relative group">
              {product.media[activeMediaIdx].type === 'image' ? (
                <Zoom zoomMargin={40}>
                  <div className="absolute inset-0">
                    <Image
                      src={product.media[activeMediaIdx].url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                </Zoom>
              ) : (
                <video
                  src={product.media[activeMediaIdx].url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm active:scale-95 cursor-pointer z-10 transition-transform duration-75 ${isWishlisted ? 'bg-white text-[var(--color-sale-red)] scale-110' : 'bg-white/80 text-[var(--color-primary)] hover:bg-white hover:scale-110'}`}
                title="Add to Wishlist"
              >
                <span className="material-symbols-outlined text-[20px] transition-none" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              </button>

              <button
                onClick={handleShare}
                className="absolute top-16 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm hover:bg-white transition-all z-10 cursor-pointer hover:scale-110"
                title="Share"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>

              {/* <button 
                onClick={() => setIsVTOOpen(true)}
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer z-10 hover:bg-white transition-colors group border border-[var(--color-outline-variant)]"
              >
                <span className="material-symbols-outlined text-[#003dff] group-hover:scale-110 transition-transform">view_in_ar</span>
                <span className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-primary)] font-bold">Virtual Try-On</span>
              </button> */}
            </div>

            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 md:px-0 py-2 items-center">
              {product.media.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIdx(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-[var(--border-radius-sm)] overflow-hidden transition-all duration-300 cursor-pointer ${activeMediaIdx === idx ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                >
                  {media.type === 'image' ? (
                    <Image src={media.url} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[24px]">play_circle</span>
                    </div>
                  )}
                </button>
              ))}
              <div className="w-20 h-24 flex-shrink-0 border border-[var(--color-outline-variant)] border-dashed flex flex-col items-center justify-center gap-1 text-[var(--color-outline)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors cursor-pointer ml-2">
                <span className="material-symbols-outlined text-[24px]">360</span>
                <span className="text-[10px] uppercase font-[var(--font-family-label-caps)] tracking-widest">360&deg; Spin</span>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO PANEL */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col px-[var(--spacing-margin-mobile)] md:px-0 py-6 md:py-0 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-120px)] lg:overflow-y-auto pb-32 pr-2">

            <div className="mb-6">
              <h1 className="font-[var(--font-family-headline-lg)] text-3xl md:text-4xl text-[var(--color-primary)] leading-tight mb-2 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-end gap-3 mb-4">
                <span className="font-[var(--font-family-price-display)] text-[24px] text-[var(--color-sale-red)]">Rs. {product.price}.00</span>
                <span className="font-[var(--font-family-body-lg)] text-[var(--color-outline)] line-through pb-[2px]">Rs. {product.originalPrice}.00</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer group mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <span key={star} className="material-symbols-outlined text-[16px]" style={{ color: i < 5 ? '#FF9529' : '#e0e0e0', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="text-sm font-[var(--font-family-body-md)] text-[var(--color-outline)] group-hover:underline underline-offset-2">4.9 (128 reviews)</span>
              </div>

              {/* BNPL & EMI Widget */}
              {/* <div className="flex flex-col gap-2 mb-8 bg-[var(--color-surface-container-low)] p-4 rounded-[var(--border-radius-sm)] border border-[var(--color-outline-variant)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFB3C7] text-black text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">Klarna.</span>
                    <p className="font-[var(--font-family-body-md)] text-[12px] text-[var(--color-primary)]">Pay in 4 interest-free payments of <strong className="font-bold">Rs. {(product.price / 4).toFixed(2)}</strong>.</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[var(--color-outline)] cursor-pointer hover:text-[var(--color-primary)]">info</span>
                </div>
                <div className="h-px w-full bg-[var(--color-outline-variant)] my-1" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#3399cc] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">Razorpay</span>
                    <p className="font-[var(--font-family-body-md)] text-[12px] text-[var(--color-primary)]">Up to <strong className="font-bold">6 months 0% EMI</strong> available on credit cards.</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[var(--color-outline)] cursor-pointer hover:text-[var(--color-primary)]">info</span>
                </div>
              </div> */}
            </div>

            <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* <div className={`flex flex-col gap-2 mb-8 bg-[var(--color-surface-container)] p-4 rounded-[var(--border-radius-md)] border transition-colors duration-300 ${stockLeft <= 3 && stockLeft > 0 ? 'border-[var(--color-sale-red)]/50 bg-[var(--color-sale-red)]/5' : 'border-transparent'}`}>
              <div className={`flex items-center gap-2 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest ${stockLeft <= 3 && stockLeft > 0 ? 'text-[var(--color-sale-red)]' : 'text-[var(--color-outline)]'}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stockLeft <= 3 && stockLeft > 0 ? 'bg-[var(--color-sale-red)]' : 'bg-green-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${stockLeft <= 3 && stockLeft > 0 ? 'bg-[var(--color-sale-red)]' : 'bg-green-500'}`}></span>
                </span>
                {stockLeft <= 3 && stockLeft > 0 ? 'High Demand' : 'Available Now'}
              </div>
              <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-primary)]">
                <strong className="font-bold">{liveViewers} people</strong> are looking at this.
                {stockLeft === 0 ? (
                  <span className="text-[var(--color-sale-red)] block mt-1">This size is currently Sold Out.</span>
                ) : stockLeft <= 5 ? (
                  <span className="text-[var(--color-sale-red)] block mt-1 animate-pulse">Only {stockLeft} left in size {activeSize}!</span>
                ) : (
                  <span className="text-[var(--color-outline)] block mt-1">In Stock in size {activeSize}.</span>
                )}
              </p>
            </div> */}

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)]">
                  Color: <span className="text-[var(--color-primary)] font-bold ml-1">{activeColor}</span>
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setActiveColor(color.name);
                      const colorIndex = product.colors.findIndex(c => c.name === color.name);
                      // Fallback to first image if not enough media for colors
                      const targetIdx = (colorIndex !== -1 && colorIndex < product.media.length) ? colorIndex : 0;
                      setActiveMediaIdx(targetIdx);
                    }}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${activeColor === color.name ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : 'ring-1 ring-[var(--color-outline-variant)]'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select color ${color.name}`}
                  >
                    {activeColor === color.name && (
                      <span className="material-symbols-outlined text-[16px]" style={{ color: color.hex === '#FAF9F6' ? '#000' : '#fff' }}>check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-outline)]">Select Size</span>
                <button
                  onClick={openSizeGuide}
                  className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-secondary)] cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`py-3 font-[var(--font-family-label-caps)] text-[14px] border transition-all cursor-pointer rounded-full ${activeSize === size ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-[var(--color-surface)]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button
                id="main-add-btn"
                onClick={handleAddToCart}
                disabled={stockLeft === 0}
                className={`w-full font-[var(--font-family-label-caps)] text-[12px] py-5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest rounded-full shadow-xl ${stockLeft === 0 ? 'bg-[var(--color-surface-container)] text-[var(--color-outline)] cursor-not-allowed' : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:text-black cursor-pointer'}`}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                {stockLeft === 0 ? 'SOLD OUT' : 'ADD TO BAG'}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-10 text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer select-none">
              <input type="checkbox" id="priceAlert" className="accent-[var(--color-primary)] w-4 h-4 cursor-pointer" />
              <label htmlFor="priceAlert" className="font-[var(--font-family-body-md)] text-sm cursor-pointer">Notify me when the price drops</label>
            </div>

            <div className="border-t border-[var(--color-outline-variant)] divide-y divide-[var(--color-outline-variant)]">
              <details className="group py-4" open>
                <summary className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-primary)] cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  Details & Fit
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] space-y-2">
                  <p>• Relaxed, oversized fit</p>
                  <p>• 100% Premium Cotton</p>
                  <p>• Dropped shoulders</p>
                  <p>• Model is 6&apos;1&quot; and wears size L</p>
                </div>
              </details>
              <details className="group py-4">
                <summary className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-primary)] cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  Material & Care
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] space-y-2">
                  <p>• Machine wash cold inside out.</p>
                  <p>• Do not bleach. Tumble dry low.</p>
                  <p>• Cool iron if needed. Do not dry clean.</p>
                </div>
              </details>
              <details className="group py-4">
                <summary className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-[var(--color-primary)] cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  Shipping & Returns
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] space-y-2">
                  <p>Free standard shipping on orders over Rs. 2000.</p>
                  <p>30-day return policy for unwashed, unworn items with tags attached.</p>
                </div>
              </details>
            </div>

          </div>
        </div>

        <section className="px-[var(--spacing-margin-mobile)] md:px-0 py-16 md:py-24 border-t border-[var(--color-outline-variant)] mt-12 md:mt-24">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-[var(--font-family-headline-lg)] text-2xl md:text-3xl text-[var(--color-primary)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[var(--color-secondary)]">auto_awesome</span>
              AI Outfit Pairings
            </h3>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 touch-pan-y">
              {relatedProducts.map(rec => (
                <div key={rec.id} className="flex-[0_0_60%] md:flex-[0_0_25%] min-w-0">
                  <div className="group card-zoom cursor-pointer relative h-[300px] mb-3">
                    <Link href={`/product/${rec.id}`} className="block relative h-full w-full bg-[var(--color-surface-container)] overflow-hidden" prefetch={true}>
                      <Image src={rec.image} alt={rec.name} fill sizes="(max-width: 768px) 60vw, 25vw" className="object-cover transition-transform duration-700 ease-out" />
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddRecommended(rec); }}
                        className="absolute bottom-4 right-4 bg-white text-[var(--color-primary)] w-10 h-10 rounded-full shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-105 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </Link>
                  </div>
                  <h4 className="font-[var(--font-family-body-md)] font-bold text-sm text-[var(--color-primary)] line-clamp-1">{rec.name}</h4>
                  <p className="font-[var(--font-family-price-display)] text-sm text-[var(--color-outline)] mt-1">Rs. {rec.price}.00</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[var(--spacing-margin-mobile)] md:px-0 py-12 md:py-24 border-t border-[var(--color-outline-variant)]">
          <h3 className="font-[var(--font-family-headline-lg)] text-2xl md:text-3xl text-[var(--color-primary)] mb-8">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(review => (
              <div key={review} className="bg-[var(--color-surface-container-low)] p-6 rounded-[var(--border-radius-lg)] border border-[var(--color-outline-variant)]">
                <div className="flex text-[var(--color-primary)] mb-3">
                  {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                </div>
                <h4 className="font-[var(--font-family-body-md)] font-bold text-[var(--color-primary)] mb-2">Perfect fit, amazing quality!</h4>
                <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] mb-4 leading-relaxed">
                  The tailoring on this piece is insane. Fits exactly like the pictures and the material feels incredibly premium. Definitely buying more colors.
                </p>
                {review === 1 && (
                  <div className="relative w-24 h-24 mb-4 rounded overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80" alt="Customer Review Photo" fill className="object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-8 h-8 bg-[var(--color-surface-container)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-primary)]">
                    JD
                  </div>
                  <span className="text-xs text-[var(--color-outline)]">John D. - Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Persistent Rail */}
        {recentProducts.length > 1 && (
          <section className="px-[var(--spacing-margin-mobile)] md:px-0 py-12 md:py-24 border-t border-[var(--color-outline-variant)]">
            <h3 className="font-[var(--font-family-headline-lg)] text-2xl md:text-3xl text-[var(--color-primary)] mb-8">Recently Viewed</h3>

            <div className="overflow-hidden" ref={recentRef}>
              <div className="flex gap-4 touch-pan-y">
                {recentProducts.filter(p => p.id !== product.id).map(recent => (
                  <div key={recent.id} className="flex-[0_0_45%] md:flex-[0_0_20%] min-w-0">
                    <div className="group card-zoom cursor-pointer relative aspect-[3/4] mb-3">
                      <Link href={`/product/${recent.id}`} className="block relative h-full w-full bg-[var(--color-surface-container)] overflow-hidden" prefetch={true}>
                        <Image src={recent.image} alt={recent.name} fill sizes="(max-width: 768px) 45vw, 20vw" className="object-cover transition-transform duration-700 ease-out" />
                      </Link>
                    </div>
                    <h4 className="font-[var(--font-family-body-md)] font-bold text-xs text-[var(--color-primary)] line-clamp-1">{recent.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Mobile Sticky Add-to-Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#111] border-t border-gray-800 p-3 z-[100] transform transition-transform duration-300 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={handleAddToCart}
            disabled={stockLeft === 0}
            className="flex-1 bg-transparent border border-gray-600 text-white font-bold text-[13px] py-3.5 rounded-lg active:scale-95 transition-all flex items-center justify-center hover:bg-white/5"
          >
            Add to cart
          </button>
          <button
            onClick={() => {
              handleAddToCart();
            }}
            disabled={stockLeft === 0}
            className="flex-1 bg-[#ffc200] text-black font-bold text-[13px] py-3.5 rounded-lg active:scale-95 transition-all shadow-md flex items-center justify-center hover:bg-[#e6b000]"
          >
            Buy at ₹{product.price}
          </button>
        </div>
      </div>

      <VirtualTryOnModal
        isOpen={isVTOOpen}
        onClose={() => setIsVTOOpen(false)}
        product={product}
      />
    </>
  );
}
