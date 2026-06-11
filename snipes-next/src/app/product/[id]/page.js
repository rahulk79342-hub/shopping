"use client";
import { useState, useEffect, use, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import Link from 'next/link';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/lib/supabase'; // Assuming mock Supabase client exists
import { useWishlistStore } from '@/store/useWishlistStore';

export default function ProductDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { addToCart } = useCart();
  const { openCartDrawer, openSizeGuide } = useUI();
  
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('Arctic Blue');
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [liveViewers, setLiveViewers] = useState(12);
  const [stockLeft, setStockLeft] = useState(8);
  
  const { wishlist, toggleWishlist } = useWishlistStore();

  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  // Complex Product Data Mock
  const product = {
    id: parseInt(id) || 1,
    name: "Digital Printed Shirt",
    price: 899,
    originalPrice: 1499,
    description: "Experience unparalleled comfort with our signature unstructured tailoring. The perfect blend of streetwear and high fashion.",
    colors: [
      { name: 'Arctic Blue', hex: '#A3C4D9' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Off-White', hex: '#FAF9F6' }
    ],
    media: [
      { type: 'image', url: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" },
      { type: 'image', url: "https://lh3.googleusercontent.com/aida/AP1WRLvdTNrLqdIbrlVcwvhf1pkicFIWpnzBFdCNmEPxGZPQWSdo5JLETjU7OD2n_HxSzocDKARWSH6316KlftpQ7TnhFoy0mGx_msvfc5QkybOjQoo3H0Dfl1ceWVKM3voQAjRKpFFhc7kJrj21ZQY6aS4zFyRINNnb8xhYILeid1pTKRLT_LG3VXqTFZKBSvir70jC-LREyJzbtBirF6QDKz9BeU13JLHCPk1fd4-MBWrPDa3Mr-u8s8tYQzA" },
      { type: 'video', url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-front-of-a-white-wall-43284-large.mp4" },
      { type: 'image', url: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio" }
    ]
  };

  const relatedProducts = [
    { id: 2, name: "Motorsport Hoodie", price: 1299, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW" },
    { id: 3, name: "Gurkha Pants", price: 1499, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN" },
    { id: 4, name: "Establish Tee", price: 699, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB" },
    { id: 5, name: "Off-White Shorts", price: 599, image: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio" }
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  // Supabase Realtime Simulation
  useEffect(() => {
    // In production: const channel = supabase.channel('product_viewers').on('broadcast', { event: 'viewer_count' }, payload => setLiveViewers(payload.viewers)).subscribe();
    const interval = setInterval(() => {
      setLiveViewers(prev => Math.max(5, prev + Math.floor(Math.random() * 5) - 2));
      // Simulate sudden stock drop
      if (Math.random() > 0.8) setStockLeft(prev => Math.max(1, prev - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-0 md:px-[var(--spacing-margin-mobile)] py-0 md:py-[var(--spacing-stack-lg)] min-h-screen">
        
        {/* Desktop Breadcrumbs */}
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
            
            {/* Main Viewer */}
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

              {/* Wishlist Mobile Overlay */}
              <button 
                onClick={() => toggleWishlist({ ...product, image: product.media[0].url })}
                className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm active:scale-95 cursor-pointer z-10 transition-all ${wishlist.some(item => item.id === product.id) ? 'bg-white text-[var(--color-sale-red)] scale-110' : 'bg-white/80 text-[var(--color-primary)] hover:bg-white hover:scale-110'}`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: wishlist.some(item => item.id === product.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 md:px-0 py-2">
              {product.media.map((media, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveMediaIdx(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-[var(--border-radius-sm)] overflow-hidden transition-all duration-300 cursor-pointer ${activeMediaIdx === idx ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                >
                  {media.type === 'image' ? (
                    <Image src={media.url} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover"/>
                  ) : (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                       <span className="material-symbols-outlined text-white text-[24px]">play_circle</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO PANEL */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col px-[var(--spacing-margin-mobile)] md:px-0 py-6 md:py-0 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-120px)] lg:overflow-y-auto hide-scrollbar pb-32">
            
            {/* Header & Pricing */}
            <div className="mb-6">
              <h1 className="font-[var(--font-family-headline-lg)] text-3xl md:text-4xl text-[var(--color-primary)] leading-tight mb-2 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-end gap-3 mb-4">
                <span className="font-[var(--font-family-price-display)] text-[24px] text-[var(--color-sale-red)]">Rs. {product.price}.00</span>
                <span className="font-[var(--font-family-body-lg)] text-[var(--color-outline)] line-through pb-[2px]">Rs. {product.originalPrice}.00</span>
              </div>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="flex text-[var(--color-primary)]">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <span className="text-sm font-[var(--font-family-body-md)] text-[var(--color-outline)] group-hover:underline underline-offset-2">4.9 (128 reviews)</span>
              </div>
            </div>

            <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Real-time Stock Indicator */}
            <div className="flex flex-col gap-2 mb-8 bg-[var(--color-surface-container)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-sale-red)]/20">
              <div className="flex items-center gap-2 text-[var(--color-sale-red)] font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-sale-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-sale-red)]"></span>
                </span>
                High Demand
              </div>
              <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-primary)]">
                <strong className="font-bold">{liveViewers} people</strong> are looking at this. Only <strong className="font-bold text-[var(--color-sale-red)]">{stockLeft} left</strong> in stock!
              </p>
            </div>

            {/* Color Swatches */}
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
                    onClick={() => setActiveColor(color.name)}
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

            {/* Size Selector */}
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
                    className={`py-3 font-[var(--font-family-label-caps)] text-[14px] border transition-all cursor-pointer ${activeSize === size ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-[var(--color-surface)]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col gap-3 mb-10">
              <button 
                id="main-add-btn"
                onClick={handleAddToCart}
                className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] py-5 hover:bg-[var(--color-secondary)] hover:text-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest shadow-xl"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                ADD TO BAG
              </button>
            </div>

            {/* Accordion / Details */}
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

        {/* Embla Related Products Carousel */}
        <section className="px-[var(--spacing-margin-mobile)] md:px-0 py-16 md:py-24 border-t border-[var(--color-outline-variant)] mt-12 md:mt-24">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-[var(--font-family-headline-lg)] text-2xl md:text-3xl text-[var(--color-primary)]">Complete The Look</h3>
          </div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 touch-pan-y">
              {relatedProducts.map(rec => (
                <div key={rec.id} className="flex-[0_0_60%] md:flex-[0_0_25%] min-w-0">
                  <div className="group card-zoom cursor-pointer relative h-[300px] mb-3">
                    <Link href={`/product/${rec.id}`} className="block relative h-full w-full bg-[var(--color-surface-container)] overflow-hidden">
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

        {/* Reviews Section */}
        <section className="px-[var(--spacing-margin-mobile)] md:px-0 py-12 md:py-24 border-t border-[var(--color-outline-variant)]">
          <h3 className="font-[var(--font-family-headline-lg)] text-2xl md:text-3xl text-[var(--color-primary)] mb-8">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(review => (
              <div key={review} className="bg-[var(--color-surface-container-low)] p-6 rounded-[var(--border-radius-lg)] border border-[var(--color-outline-variant)]">
                <div className="flex text-[var(--color-primary)] mb-3">
                  {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                </div>
                <h4 className="font-[var(--font-family-body-md)] font-bold text-[var(--color-primary)] mb-2">Perfect fit, amazing quality!</h4>
                <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] mb-4 leading-relaxed">
                  The tailoring on this piece is insane. Fits exactly like the pictures and the material feels incredibly premium. Definitely buying more colors.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--color-surface-container)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-primary)]">
                    JD
                  </div>
                  <span className="text-xs text-[var(--color-outline)]">John D. - Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Mobile Sticky Add-to-Cart Bar */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-[var(--color-background)] border-t border-[var(--color-outline-variant)] p-4 z-[100] transform transition-transform duration-300 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.1)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-grow">
            <h4 className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest text-[var(--color-outline)] line-clamp-1 mb-1">{product.name}</h4>
            <span className="font-[var(--font-family-price-display)] text-[14px] text-[var(--color-primary)]">Rs. {product.price}.00</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-[180px] bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[11px] py-4 rounded-full active:scale-95 transition-transform uppercase tracking-widest shadow-lg flex items-center justify-center cursor-pointer"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  );
}
