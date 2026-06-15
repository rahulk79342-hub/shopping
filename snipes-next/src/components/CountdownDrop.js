"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock drop date: Set to a few hours from now for testing purposes, or past for "live" state.
// We'll set it to 2 days from now.
const DROP_DATE = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000 + 15 * 60 * 1000); 

export default function CountdownDrop() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = DROP_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsLive(false);
      } else {
        setIsLive(true);
      }
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setEmail('');
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">
        
        {/* Visual / Image Side */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-[600px] bg-black group overflow-hidden">
           <Image 
             src="https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5" 
             fill 
             alt="Limited Drop Item"
             className="object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
           
           <div className="absolute bottom-8 left-8">
             <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md mb-3">
               Limited Edition
             </span>
             <h3 className="text-[24px] md:text-[32px] font-bold" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
               The Midnight Collection
             </h3>
           </div>
        </div>

        {/* Content / Timer Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
           
           {/* Subtle background noise/texture could go here */}

           <div className="w-full max-w-md relative z-10">
              
              <AnimatePresence mode="wait">
                {!isLive ? (
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-8">
                      <span className="text-[12px] text-red-500 font-bold uppercase tracking-[0.2em] mb-2 block flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Dropping Soon
                      </span>
                      <h2 className="text-[36px] md:text-[48px] font-bold tracking-tighter leading-tight mb-4">
                        Don't Miss Out.
                      </h2>
                      <p className="text-gray-400 text-[14px] md:text-[16px]">
                        Our most exclusive capsule collection drops exactly when the timer hits zero. Extremely limited quantities.
                      </p>
                    </div>

                    {/* Timer */}
                    <div className="flex gap-4 mb-10">
                      {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Mins', value: timeLeft.minutes },
                        { label: 'Secs', value: timeLeft.seconds }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-sm">
                            <span className="text-[24px] md:text-[32px] font-bold tabular-nums tracking-tighter">{item.value.toString().padStart(2, '0')}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Notify Form */}
                    <div className="relative">
                      {isSubmitted ? (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="w-full p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg flex items-center gap-3 text-[14px]"
                        >
                          <span className="material-symbols-outlined text-[20px]">check_circle</span>
                          You're on the list. Check your inbox soon.
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                           <label htmlFor="drop-email" className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Get Early Access</label>
                           <div className="flex flex-col sm:flex-row gap-3">
                             <input 
                               type="email" 
                               id="drop-email"
                               required
                               placeholder="Enter your email or WhatsApp..." 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="flex-1 bg-white/5 border border-white/10 text-white px-5 py-4 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-[14px] placeholder:text-gray-600"
                             />
                             <button type="submit" className="bg-white text-black font-bold uppercase tracking-widest text-[12px] px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                               Notify Me
                             </button>
                           </div>
                        </form>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start"
                  >
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-500 text-[11px] font-bold uppercase tracking-widest">Now Live</span>
                     </div>
                     <h2 className="text-[40px] md:text-[56px] font-bold tracking-tighter leading-none mb-4">
                        The Drop is Live.
                     </h2>
                     <p className="text-gray-400 text-[16px] mb-8 max-w-sm">
                        The Midnight Collection is officially available. Stock is extremely limited and will sell out fast.
                     </p>
                     <button className="bg-white text-black font-bold uppercase tracking-widest text-[13px] px-10 py-5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Shop Now
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>

           </div>
        </div>

      </div>
    </section>
  );
}
