"use client";
import { useState, useEffect, use } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { addToCart } = useCart();
  const { openCartDrawer, openSizeGuide } = useUI();
  const [activeSize, setActiveSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const product = {
    id: parseInt(id) || 1,
    name: "Digital Printed Shirt - Arctic Blue",
    price: 899,
    originalPrice: 1499,
    images: [
      "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
      "https://lh3.googleusercontent.com/aida/AP1WRLvdTNrLqdIbrlVcwvhf1pkicFIWpnzBFdCNmEPxGZPQWSdo5JLETjU7OD2n_HxSzocDKARWSH6316KlftpQ7TnhFoy0mGx_msvfc5QkybOjQoo3H0Dfl1ceWVKM3voQAjRKpFFhc7kJrj21ZQY6aS4zFyRINNnb8xhYILeid1pTKRLT_LG3VXqTFZKBSvir70jC-LREyJzbtBirF6QDKz9BeU13JLHCPk1fd4-MBWrPDa3Mr-u8s8tYQzA"
    ]
  };

  const recommendedProducts = [
    {
      id: 2,
      name: "Digital Printed Shirts - Beige&Black",
      price: 899,
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio"
    },
    {
      id: 3,
      name: "Establish Printed Tee - White",
      price: 699,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB"
    }
  ]

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart({ ...product, size: activeSize, image: product.images[0] });
    openCartDrawer();
  };

  const handleAddRecommended = (recProduct) => {
    addToCart({ ...recProduct, size: 'M' });
    openCartDrawer();
  }

  // Handle Sticky Bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const addBtn = document.getElementById('main-add-btn');
      if (addBtn) {
        const rect = addBtn.getBoundingClientRect();
        // Show sticky bar when main button scrolls out of view
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] py-[var(--spacing-stack-md)] md:py-[var(--spacing-stack-lg)] min-h-screen">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)] mb-[var(--spacing-stack-md)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/discover" className="hover:text-[var(--color-primary)]">Shirts</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[var(--color-primary)]">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-[var(--spacing-stack-lg)] lg:gap-[var(--spacing-section-gap)]">
          {/* Product Images */}
          <div className="w-full md:w-[55%] flex flex-col gap-4">
            <div className="aspect-[3/4] bg-[var(--color-surface-container)] w-full overflow-hidden relative">
              <Image src={product.images[activeImage]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover"/>
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-[var(--color-primary)] transition-colors cursor-pointer">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-24 relative flex-shrink-0 bg-[var(--color-surface-container)] cursor-pointer border-2 transition-colors ${activeImage === idx ? 'border-[var(--color-primary)]' : 'border-transparent'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover"/>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-[45%] flex flex-col lg:sticky lg:top-24 lg:self-start">
            <div className="flex justify-between items-start mb-2">
              <h1 className="font-[var(--font-family-headline-lg)] text-2xl md:text-[var(--text-headline-lg)] text-[var(--color-primary)] leading-tight">{product.name}</h1>
              <button className="p-2 border border-[var(--color-outline-variant)] rounded hover:bg-[var(--color-surface-container)] transition-colors cursor-pointer ml-4">
                <span className="material-symbols-outlined text-[var(--color-primary)]">share</span>
              </button>
            </div>
            <div className="flex items-end gap-3 mb-[var(--spacing-stack-md)]">
              <span className="font-[var(--font-family-price-display)] text-[24px] text-[var(--color-sale-red)]">Rs. {product.price}.00</span>
              <span className="font-[var(--font-family-body-lg)] text-[var(--color-outline)] line-through pb-0.5">Rs. {product.originalPrice}.00</span>
              <span className="bg-[var(--color-sale-red)] text-white font-[var(--font-family-label-caps)] text-[10px] px-2 py-1 uppercase ml-2 rounded-[var(--border-radius-sm)] pb-1">40% OFF</span>
            </div>

            <div className="flex items-center gap-1 mb-6">
              <div className="flex text-[var(--color-primary)]">
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star_half</span>
              </div>
              <span className="text-xs text-[var(--color-outline)] ml-2">24 reviews</span>
            </div>

            <div className="mb-[var(--spacing-stack-lg)] text-[var(--color-outline)] text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span>
              In stock - Ships within 24 hours
            </div>

            <div className="mb-[var(--spacing-stack-lg)]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] text-[var(--color-primary)]">SELECT SIZE</span>
                <button onClick={openSizeGuide} className="font-[var(--font-family-body-md)] text-sm text-[var(--color-outline)] underline underline-offset-2 hover:text-[var(--color-primary)] cursor-pointer">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`py-3 font-[var(--font-family-label-caps)] text-[14px] border rounded-[var(--border-radius-sm)] transition-colors cursor-pointer ${activeSize === size ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-[var(--spacing-stack-xl)]">
              <button 
                id="main-add-btn"
                onClick={handleAddToCart}
                className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] py-4 hover:bg-[var(--color-surface-tint)] transition-colors active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                ADD TO BAG
              </button>
              <Link href="/checkout"
                className="w-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] py-4 hover:bg-[var(--color-surface-container)] transition-colors text-center inline-block cursor-pointer uppercase tracking-widest"
              >
                BUY IT NOW
              </Link>
            </div>

            {/* Inline Cross-Selling Sidebar */}
            <div className="border-t border-[var(--color-outline-variant)] pt-[var(--spacing-stack-lg)]">
              <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] mb-4">You may also like</h3>
              <div className="flex flex-col gap-4">
                {recommendedProducts.map(rec => (
                  <div key={rec.id} className="flex gap-4 items-center bg-[var(--color-surface-container-low)] p-3 rounded border border-[var(--color-outline-variant)]/50">
                    <div className="w-16 h-20 relative bg-[var(--color-surface-container)]">
                      <Image src={rec.image} alt={rec.name} fill sizes="64px" className="object-cover rounded" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-[var(--font-family-body-md)] font-bold text-[14px] text-[var(--color-primary)] line-clamp-1">{rec.name}</h4>
                      <p className="font-[var(--font-family-price-display)] text-[14px] text-[var(--color-primary)] mt-1">Rs. {rec.price}.00</p>
                    </div>
                    <button 
                      onClick={() => handleAddRecommended(rec)}
                      className="bg-[var(--color-primary)] text-white p-2 rounded hover:bg-[var(--color-surface-tint)] transition-colors flex items-center gap-1 cursor-pointer font-[var(--font-family-label-caps)] text-[10px] uppercase"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Add-to-Cart Bar */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-[var(--color-outline-variant)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 z-40 transform transition-transform duration-300 flex justify-between items-center md:px-[var(--spacing-margin-mobile)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="hidden md:flex items-center gap-4">
          <div className="w-12 h-16 relative">
             <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover rounded" />
          </div>
          <div>
            <h4 className="font-[var(--font-family-body-md)] font-bold text-[14px] text-[var(--color-primary)]">{product.name}</h4>
            <span className="font-[var(--font-family-price-display)] text-[14px] text-[var(--color-sale-red)]">Rs. {product.price}.00</span>
          </div>
        </div>
        <div className="flex w-full md:w-auto items-center gap-4">
          <select 
            value={activeSize}
            onChange={(e) => setActiveSize(e.target.value)}
            className="border border-[var(--color-outline-variant)] rounded p-3 font-[var(--font-family-label-caps)] text-[12px] bg-transparent focus:outline-none focus:border-[var(--color-primary)]"
          >
            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button 
            onClick={handleAddToCart}
            className="flex-grow md:w-64 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] py-4 hover:bg-[var(--color-surface-tint)] transition-colors active:scale-[0.99] uppercase tracking-widest cursor-pointer"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  );
}
