"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '@/app/actions/auth';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';
import Image from 'next/image';
import { MdOutlineShoppingBag, MdOutlineStars, MdOutlineAdd, MdOutlineReceiptLong, MdOutlineCheckroom, MdOutlineLocationOn } from 'react-icons/md';


const TABS = [
  { id: 'orders', label: 'Order History', icon: MdOutlineReceiptLong },
  { id: 'loyalty', label: 'Snipes Rewards', icon: MdOutlineStars },
  { id: 'profile', label: 'Style Profile', icon: MdOutlineCheckroom },
  { id: 'addresses', label: 'Addresses', icon: MdOutlineLocationOn },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [mounted, setMounted] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartDrawer } = useUI();

  useEffect(() => setMounted(true), []);

  const handleReorder = (item) => {
    addToCart({ ...item, quantity: 1, size: item.size || 'M' });
    openCartDrawer();
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--color-background)]"></div>;

  return (
    <main className="min-h-screen bg-[var(--color-surface)] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-outline-variant)] py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)]">
          DEMO
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-[var(--font-family-body-md)] text-[14px] hidden md:inline-block">vip@snipes.com</span>
          <button onClick={() => logout()} className="text-[12px] font-[var(--font-family-label-caps)] uppercase tracking-widest text-[var(--color-outline)] hover:text-[var(--color-primary)]">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12 flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] overflow-hidden shadow-sm sticky top-32">
            <div className="p-6 border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]">
              <div className="w-16 h-16 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                V
              </div>
              <h2 className="font-[var(--font-family-headline-md)] text-lg">VIP Member</h2>
              <p className="text-[12px] text-[var(--color-outline)]">Joined Oct 2023</p>
            </div>
            <nav className="flex flex-row md:flex-col overflow-x-auto hide-scrollbar">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-left whitespace-nowrap transition-colors border-b border-[var(--color-outline-variant)] md:border-b-0 md:border-l-2 last:border-0 ${activeTab === tab.id ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)] border-l-[var(--color-primary)]' : 'border-l-transparent text-[var(--color-outline)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)]'}`}
                >
                  <tab.icon className="text-[18px]" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* ORDER HISTORY TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="font-[var(--font-family-headline-md)] text-2xl mb-6">Order History</h2>
                  
                  {/* Mock Order 1 */}
                  <div className="bg-white rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm overflow-hidden">
                    <div className="bg-[var(--color-surface-container-low)] p-4 md:p-6 border-b border-[var(--color-outline-variant)] flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Order Placed</p>
                        <p className="font-[var(--font-family-body-md)] text-[14px]">Oct 12, 2023</p>
                      </div>
                      <div>
                        <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Total</p>
                        <p className="font-[var(--font-family-price-display)] text-[14px]">Rs. 2499.00</p>
                      </div>
                      <div>
                        <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Order #</p>
                        <p className="font-[var(--font-family-body-md)] text-[14px]">ORD-99214</p>
                      </div>
                      <div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-[var(--font-family-label-caps)] uppercase tracking-widest rounded-full">Delivered</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-24 aspect-[3/4] relative bg-[var(--color-surface-container)] rounded-sm overflow-hidden flex-shrink-0">
                         <Image src="https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" alt="Digital Printed Shirt" fill className="object-cover" />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="font-[var(--font-family-body-md)] font-bold text-[16px] mb-1">Digital Printed Shirt</h3>
                        <p className="text-[12px] text-[var(--color-outline)] mb-2">Size: L | Color: Arctic Blue</p>
                        <button className="text-[12px] text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-outline)]">View Details</button>
                      </div>
                      <div className="w-full md:w-auto">
                        <button 
                          onClick={() => handleReorder({ id: 1, name: "Digital Printed Shirt", price: 2499, image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", size: 'L' })}
                          className="w-full md:w-auto bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest px-6 py-3 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors flex items-center justify-center gap-2"
                        >
                          <MdOutlineShoppingBag className="text-[16px]" />
                          Buy It Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LOYALTY PROGRAM TAB */}
              {activeTab === 'loyalty' && (
                <div className="space-y-6">
                  <h2 className="font-[var(--font-family-headline-md)] text-2xl mb-6">Snipes Rewards</h2>
                  
                  <div className="bg-gradient-to-br from-[#111] to-[#333] text-white p-8 rounded-[var(--border-radius-lg)] shadow-lg relative overflow-hidden">
                    <MdOutlineStars className="absolute -right-4 -bottom-4 text-[150px] opacity-10"  />
                    
                    <p className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-yellow-400 mb-2">Gold Tier</p>
                    <div className="flex items-end gap-2 mb-8">
                      <span className="font-[var(--font-family-display-lg)] text-6xl font-extrabold">4,250</span>
                      <span className="mb-2">Points</span>
                    </div>
                    
                    <div className="mb-2 flex justify-between text-[12px]">
                      <span>Current: Gold</span>
                      <span>Next: Platinum (5,000 pts)</span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-6">
                      <div className="h-full bg-yellow-400 w-[85%]"></div>
                    </div>

                    <button className="bg-white text-black font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest px-6 py-3 rounded-[var(--border-radius-sm)] hover:bg-gray-100 transition-colors">
                      Redeem Points
                    </button>
                  </div>
                </div>
              )}

              {/* STYLE PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="font-[var(--font-family-headline-md)] text-2xl mb-6">Style Profile</h2>
                  <div className="bg-white p-6 md:p-8 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
                    <p className="text-[14px] text-[var(--color-outline)] mb-8">Set your preferences so we can recommend the perfect fit.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest mb-3">Top Size</label>
                        <select className="w-full border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px] focus:outline-none">
                          <option>Small (S)</option>
                          <option selected>Medium (M)</option>
                          <option>Large (L)</option>
                          <option>Extra Large (XL)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest mb-3">Bottom Size</label>
                        <select className="w-full border border-[var(--color-outline-variant)] p-3 rounded-[var(--border-radius-sm)] text-[14px] focus:outline-none">
                          <option>30</option>
                          <option selected>32</option>
                          <option>34</option>
                          <option>36</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest mb-3">Fit Preference</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-[14px]">
                            <input type="radio" name="fit" className="accent-[var(--color-primary)]" /> Slim
                          </label>
                          <label className="flex items-center gap-2 text-[14px]">
                            <input type="radio" name="fit" className="accent-[var(--color-primary)]" defaultChecked /> Relaxed
                          </label>
                          <label className="flex items-center gap-2 text-[14px]">
                            <input type="radio" name="fit" className="accent-[var(--color-primary)]" /> Oversized
                          </label>
                        </div>
                      </div>
                    </div>

                    <button className="mt-8 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest px-8 py-4 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors">
                      Save Profile
                    </button>
                  </div>
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-[var(--font-family-headline-md)] text-2xl">Saved Addresses</h2>
                    <button className="flex items-center gap-2 text-[var(--color-primary)] text-[14px] hover:underline">
                      <MdOutlineAdd className="text-[18px]" /> Add New
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-[var(--border-radius-md)] border-2 border-[var(--color-primary)] shadow-sm relative">
                      <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-white text-[9px] font-[var(--font-family-label-caps)] uppercase tracking-widest px-2 py-1 rounded-sm">Default</span>
                      <h3 className="font-bold text-[16px] mb-2">Home</h3>
                      <p className="text-[14px] text-[var(--color-outline)] mb-1">123 Main Street</p>
                      <p className="text-[14px] text-[var(--color-outline)] mb-1">Apt 4B</p>
                      <p className="text-[14px] text-[var(--color-outline)] mb-4">New York, NY 10001</p>
                      <div className="flex gap-4">
                        <button className="text-[12px] text-[var(--color-primary)] underline">Edit</button>
                        <button className="text-[12px] text-[var(--color-error)] underline">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
