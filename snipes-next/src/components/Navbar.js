"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const mockSearchResults = [
  { id: 1, name: "Vintage Wash Tee", price: "₹899", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW" },
  { id: 2, name: "Classic Chinos", price: "₹1499", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN" },
  { id: 3, name: "Linen Blend Shirt", price: "₹1299", img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" },
  { id: 4, name: "Polo Shirt", price: "₹999", img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio" }
];

export default function Navbar() {
  const cartCount = useCartStore(state => state.cartCount());
  const { openCartDrawer } = useUI();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const hideTimeoutRef = useRef(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 50) {
      setScrollDirection('down');
    } else if (latest < previous) {
      setScrollDirection('up');
    }
    setIsScrolled(latest > 50);
  });

  const handleMouseEnter = (menu) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const isSlim = isScrolled && scrollDirection === 'down' && !isHovered && !activeMenu && !isSearchActive && !isMobileMenuOpen;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          backgroundColor: isScrolled || activeMenu || isSearchActive ? "white" : "white",
          borderBottom: isScrolled || activeMenu || isSearchActive ? "1px solid rgba(10, 10, 10, 0.08)" : "1px solid rgba(10, 10, 10, 0.08)"
        }}
        className="w-full relative bg-white"
      >
        <div className="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-16 max-w-screen-2xl mx-auto">
          
          {/* Left: Menu & Nav Links */}
          <div className={`flex items-center gap-4 z-10 flex-1 md:flex-none md:w-1/3 ${isSearchActive ? 'hidden md:flex' : ''}`}>
            <motion.button 
              animate={{ opacity: isSlim ? 0 : 1, width: isSlim ? 0 : 'auto', pointerEvents: isSlim ? 'none' : 'auto' }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="hover:opacity-80 transition-opacity cursor-pointer flex items-center md:hidden overflow-hidden"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </motion.button>
            
            <motion.div 
               animate={{ opacity: isSlim ? 0 : 1, pointerEvents: isSlim ? 'none' : 'auto' }}
               className="hidden md:flex items-center gap-8"
            >
              {['New Arrivals', 'Linen', 'Old Money'].map((item) => (
                <div 
                  key={item}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  className="py-6 cursor-pointer border-b-2 border-transparent hover:border-black transition-colors"
                >
                  <span className={`text-[12px] font-bold tracking-widest uppercase ${activeMenu === item ? 'text-black' : 'text-gray-500'} transition-colors`}>
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Center: Logo */}
          <div className={`flex justify-center flex-1 z-10 absolute left-1/2 -translate-x-1/2 ${isSearchActive ? 'hidden md:flex' : ''}`}>
            <Link href="/" className="font-bold text-[24px] tracking-tighter hover:opacity-90 transition-opacity uppercase" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "-1px" }}>
              SNIPES
            </Link>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className={`flex items-center justify-end gap-4 md:gap-6 z-10 ${isSearchActive ? 'w-full md:w-1/3' : 'flex-1 md:flex-none md:w-1/3'}`}>
            <motion.div
              animate={{ opacity: isSlim ? 0 : 1, width: isSlim ? 0 : 'auto', pointerEvents: isSlim ? 'none' : 'auto' }}
              className={`relative flex items-center overflow-hidden ${isSearchActive ? 'w-full' : ''}`}
            >
              {isSearchActive ? (
                <div className="flex items-center border-b border-black pb-1 w-full md:w-[250px] transition-all mt-1">
                  <input 
                    type="text" 
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..." 
                    className="w-full text-[13px] outline-none bg-transparent placeholder-gray-400 font-medium"
                  />
                  <button onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} className="material-symbols-outlined text-[18px] text-gray-500 hover:text-black">close</button>
                </div>
              ) : (
                <button onClick={() => setIsSearchActive(true)} className="hover:opacity-80 transition-all cursor-pointer flex items-center">
                  <span className="material-symbols-outlined text-[24px]">search</span>
                </button>
              )}
            </motion.div>

            <motion.div animate={{ opacity: isSlim ? 0 : 1, width: isSlim ? 0 : 'auto', pointerEvents: isSlim ? 'none' : 'auto' }} className="overflow-hidden">
              <Link href="/account" className="flex hover:opacity-80 transition-all cursor-pointer items-center">
                <span className="material-symbols-outlined text-[24px]">person</span>
              </Link>
            </motion.div>

            {/* Cart always visible */}
            <button onClick={openCartDrawer} className="relative hover:opacity-80 transition-all cursor-pointer flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Predictive Search Dropdown */}
        <AnimatePresence>
          {isSearchActive && searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden z-40"
            >
              <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Suggestions for "{searchQuery}"</h3>
                  <button onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} className="text-[12px] font-bold underline hover:text-gray-600">View all results</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {mockSearchResults.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} onClick={() => setIsSearchActive(false)} className="group flex flex-col items-start gap-3 hover:bg-gray-50 p-3 rounded-[12px] transition-colors border border-transparent hover:border-gray-100">
                      <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] rounded-[8px] overflow-hidden">
                        <Image src={product.img} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" alt={product.name} />
                      </div>
                      <div className="w-full">
                        <p className="text-[13px] font-bold text-black truncate">{product.name}</p>
                        <p className="text-[12px] text-gray-500 font-medium">{product.price}</p>
                      </div>
                    </Link>
                  ))}
                  {mockSearchResults.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                     <div className="col-span-4 text-center py-10">
                        <p className="text-gray-500 text-[14px]">No products found matching "{searchQuery}".</p>
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu && !isSearchActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden z-40 hidden md:block"
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-screen-2xl mx-auto px-8 py-10 flex gap-16">
                <div className="w-1/5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-black mb-6">{activeMenu} Categories</h3>
                  <ul className="flex flex-col gap-4">
                    {['All Items', 'Best Sellers', 'Just Dropped', 'Sale'].map(link => (
                      <li key={link}><Link href="/discover" className="text-[14px] text-gray-500 hover:text-black font-medium transition-colors">{link}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="w-1/5">
                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-black mb-6">Collections</h3>
                   <ul className="flex flex-col gap-4">
                    {['Summer Breeze', 'Evening Wear', 'Everyday Basics', 'Vacation Edit'].map(link => (
                      <li key={link}><Link href="/discover" className="text-[14px] text-gray-500 hover:text-black font-medium transition-colors">{link}</Link></li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-3/5 flex gap-8 border-l border-gray-100 pl-16">
                   <Link href="/discover" className="relative w-1/2 aspect-[4/5] bg-[#f8f8f8] rounded-[16px] overflow-hidden group block cursor-pointer">
                      <Image src={activeMenu === 'Old Money' ? "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio" : "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" alt="Featured" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">New In</div>
                   </Link>
                   <div className="flex flex-col justify-center max-w-[250px]">
                      <h4 className="text-[20px] font-bold text-black mb-3 leading-tight">The Signature Series</h4>
                      <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">Discover our latest {activeMenu.toLowerCase()} arrivals tailored for the modern gentleman.</p>
                      <div>
                        <Link href="/discover" className="text-[12px] font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">Shop Now</Link>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-white z-[100] overflow-y-auto md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-4 h-14 border-b border-gray-100">
                <span className="font-bold text-[20px] tracking-tighter uppercase" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "-1px" }}>SNIPES</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="material-symbols-outlined text-[28px] text-black">close</button>
              </div>
              
              <div className="px-6 py-8 flex-1">
                <ul className="flex flex-col gap-6 mb-10">
                  {['New Arrivals', 'Linen', 'Old Money'].map(item => (
                    <li key={item}>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="text-[24px] font-bold text-black hover:text-gray-600 transition-colors uppercase tracking-tight">{item}</Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-6">Collections</h3>
                <ul className="flex flex-col gap-4 mb-10">
                  {['Summer Breeze', 'Evening Wear', 'Everyday Basics', 'Vacation Edit'].map(link => (
                    <li key={link}><Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] text-gray-600 hover:text-black font-medium transition-colors">{link}</Link></li>
                  ))}
                </ul>

                <div className="mt-auto">
                   <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="relative w-full aspect-[4/3] bg-[#f8f8f8] rounded-[16px] overflow-hidden group block cursor-pointer mb-4">
                      <Image src="https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" fill className="object-cover object-top" alt="Featured" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">New In</div>
                   </Link>
                   <h4 className="text-[18px] font-bold text-black mb-1">The Signature Series</h4>
                   <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-bold uppercase tracking-widest text-black underline underline-offset-4">Shop Now</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
