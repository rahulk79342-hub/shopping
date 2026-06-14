"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoyaltyTeaser() {
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  useEffect(() => {
    // Check if user is returning (mock for logged-in state)
    const hasVisited = localStorage.getItem('hasVisited_snipes');
    if (hasVisited) {
      setIsReturningUser(true);
    }
  }, []);

  const tiers = [
    {
      name: "Insider",
      points: "0 - 499",
      perks: ["Free Standard Shipping", "Birthday Gift", "Early Access to Sales"],
      color: "bg-zinc-800",
      accent: "text-zinc-400"
    },
    {
      name: "Silver",
      points: "500 - 1,999",
      perks: ["Free Express Shipping", "Exclusive Drops", "10% Off All Orders"],
      color: "bg-slate-300",
      accent: "text-slate-600",
      gradient: "from-slate-200 to-slate-400 text-black"
    },
    {
      name: "Gold",
      points: "2,000+",
      perks: ["Free Next-Day Delivery", "Dedicated Stylist", "Invite-Only Events"],
      color: "bg-yellow-600",
      accent: "text-yellow-800",
      gradient: "from-yellow-300 via-yellow-500 to-yellow-600 text-black shadow-[0_0_30px_rgba(234,179,8,0.3)]"
    }
  ];

  // Mock logged-in user points
  const currentPoints = 350;
  const nextTierPoints = 500;
  const progressPercentage = (currentPoints / nextTierPoints) * 100;

  return (
    <section className="w-full py-16 md:py-24 bg-[#050505] text-white border-t border-white/10 overflow-hidden relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-center justify-between mb-16">
          <div className="max-w-xl">
             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[14px]">stars</span>
                Snipes Rewards
             </span>
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter leading-none mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
               Unlock the Vault.
             </h2>
             <p className="text-gray-400 text-[14px] md:text-[16px] leading-relaxed">
               Join the most exclusive rewards program in menswear. Earn points on every purchase, climb the tiers, and unlock unprecedented perks including dedicated stylists and early access to drops.
             </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px] bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-[24px]">
             {isReturningUser ? (
               // LOGGED IN VIEW (Mocked)
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <div>
                     <span className="text-[12px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Current Status</span>
                     <span className="text-[24px] font-bold text-white tracking-tight">Insider</span>
                   </div>
                   <div className="text-right">
                     <span className="text-[24px] font-bold text-yellow-500 tabular-nums">{currentPoints}</span>
                     <span className="text-[12px] text-gray-400 ml-1 uppercase">Pts</span>
                   </div>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="w-full h-2 bg-white/10 rounded-full mt-4 mb-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progressPercentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                    />
                 </div>
                 
                 <p className="text-[13px] text-gray-400 text-center font-medium">
                   Only <span className="text-white font-bold">{nextTierPoints - currentPoints} points</span> away from <span className="text-slate-300 font-bold">Silver</span>.
                 </p>
               </div>
             ) : (
               // GUEST VIEW
               <div className="text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-4 border border-yellow-500/30">
                    <span className="material-symbols-outlined text-[32px]">redeem</span>
                 </div>
                 <h3 className="text-[20px] font-bold mb-2">Start Earning Today</h3>
                 <p className="text-gray-400 text-[13px] mb-6">Create an account right now and we'll credit your wallet with 200 points instantly.</p>
                 <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-[13px] py-4 rounded-full hover:bg-gray-200 transition-colors">
                   Join For Free
                 </button>
                 <span className="text-[11px] text-gray-500 mt-4 block">Already a member? <a href="#" className="text-white hover:underline">Log in</a></span>
               </div>
             )}
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div 
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-[24px] border ${tier.gradient ? `bg-gradient-to-br ${tier.gradient} border-transparent` : 'bg-white/5 border-white/10'}`}
            >
              <div className="flex justify-between items-center mb-8 border-b border-black/10 pb-4">
                 <h3 className={`text-[24px] font-bold ${tier.gradient ? 'text-black' : 'text-white'}`}>{tier.name}</h3>
                 <span className={`text-[12px] font-bold tracking-widest ${tier.gradient ? 'text-black/60' : 'text-gray-500'}`}>{tier.points} PTS</span>
              </div>
              
              <ul className="space-y-4">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-[18px] ${tier.gradient ? 'text-black' : 'text-yellow-500'}`}>check_circle</span>
                    <span className={`text-[14px] font-medium ${tier.gradient ? 'text-black/80' : 'text-gray-300'}`}>{perk}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
