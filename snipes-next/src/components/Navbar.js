"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import AccountPopover from './AccountPopover';
import { useUI } from '@/context/UIContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const mockSearchResults = [
  { id: 1, name: "Vintage Wash Tee", price: "₹899", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Classic Chinos", price: "₹1499", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Linen Blend Shirt", price: "₹1299", img: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Polo Shirt", price: "₹999", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80" }
];

export default function Navbar() {
  const cartCount = useCartStore(state => state.cartCount());
  const user = useAuthStore(state => state.user);
  const { openCartDrawer, openAura } = useUI();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const hideTimeoutRef = useRef(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  const isSlim = isScrolled && scrollDirection === 'down' && !isHovered && !activeMenu && !isSearchActive && !isMobileMenuOpen && !isAccountOpen;

  return (
    <motion.header className="sticky top-0 left-0 right-0 z-50 w-full"
      animate={{ y: isSlim ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full relative bg-white border-b border-[rgba(10,10,10,0.08)]"
      >
        <div className="flex justify-between items-center w-full px-4 md:px-8 xl:px-12 h-14 md:h-16 max-w-screen-2xl mx-auto">

          {/* Left: Menu & Nav Links */}
          <div className={`flex items-center gap-4 z-10 flex-1 md:flex-none md:w-1/3 ${isSearchActive ? 'hidden md:flex' : ''}`}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="hover:opacity-80 transition-opacity cursor-pointer flex items-center md:hidden overflow-hidden"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
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
            </div>
          </div>

          {/* Center: Logo */}
          <div className={`flex justify-center flex-1 z-10 absolute left-1/2 -translate-x-1/2 ${isSearchActive ? 'hidden md:flex' : ''}`}>
            <Link href="/" className="font-bold text-[24px] tracking-tighter hover:opacity-90 transition-opacity uppercase" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "-1px" }}>
              SNIPES
            </Link>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className={`flex items-center justify-end gap-4 md:gap-6 z-10 ${isSearchActive ? 'w-full md:w-1/3' : 'flex-1 md:flex-none md:w-1/3'}`}>
            
            {/* AURA AI Button */}
            <button 
              onClick={openAura} 
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 text-white text-[11px] font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all ${isSearchActive ? 'hidden' : ''}`}
            >
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              AURA AI
            </button>

            <div
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
            </div>

            <div className="relative">
              <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="flex hover:opacity-80 transition-all cursor-pointer items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-transparent border-0">
                {user ? (
                  <div className="w-full h-full bg-black text-white flex items-center justify-center rounded-full text-[13px] font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-[24px]">person</span>
                )}
              </button>
              <AccountPopover isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
            </div>


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
              <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 py-8">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Suggestions for "{searchQuery}"</h3>
                  <Link href={`/discover?q=${searchQuery}`} onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} className="text-[12px] font-bold underline hover:text-gray-600">View all results</Link>
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
              <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 py-10 flex gap-16">
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
                    <Image src={activeMenu === 'Old Money' ? "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=800&q=80"} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" alt="Featured" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">New In</div>
                  </Link>
                  <div className="flex flex-col justify-center max-w-[250px]">
                    <h4 className="text-[20px] font-bold text-black mb-3 leading-tight">The Signature Series</h4>
                    <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">Discover our latest {activeMenu.toLowerCase()} tailored for the modern gentleman.</p>
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
            <div className="fixed inset-0 z-[100] md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[350px] bg-white overflow-y-auto flex flex-col"
              >
                <div className="p-4 pt-6">
                  <button onClick={() => setIsMobileMenuOpen(false)} className="mb-6 flex items-center justify-center w-8 h-8 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[24px] text-black">close</span>
                  </button>

                  <ul className="flex flex-col gap-5 px-2">
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => { setIsMobileMenuOpen(false); openAura(); }} className="w-full flex items-center justify-between text-[22px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 font-bold hover:opacity-80 transition-opacity tracking-tight">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[24px] text-purple-600">auto_awesome</span>
                          AURA AI Stylist
                        </span>
                      </button>
                    </li>
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        Gurkha Pants
                      </Link>
                    </li>
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        Old Money
                      </Link>
                    </li>
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        Tops
                        <span className="material-symbols-outlined text-[20px] text-gray-400">chevron_right</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        Bottoms
                        <span className="material-symbols-outlined text-[20px] text-gray-400">chevron_right</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[22px] text-black hover:text-gray-600 transition-colors tracking-tight">
                        Store Locator
                      </Link>
                    </li>
                  </ul>

                  <div className="mt-40 px-2 pb-6">
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
                      {mockSearchResults.slice(0, 3).map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} onClick={() => setIsMobileMenuOpen(false)} className="min-w-[140px] flex-1 snap-start flex flex-col gap-2">
                          <div className="relative aspect-[4/5] bg-[#f8f8f8] rounded-[8px] overflow-hidden">
                            <Image src={product.img} fill className="object-cover object-top" alt={product.name} />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-black truncate">{product.name}</p>
                            <p className="text-[12px] text-gray-500 font-medium">{product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
