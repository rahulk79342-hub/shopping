"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock drop date: Set to a few hours from now for testing purposes
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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setEmail('');
  };

  return (
    <section className="w-full bg-[#050505] text-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">
        
        {/* Visual / Image Side */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-[700px] bg-black group overflow-hidden">
           <Image 
             src="https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=1600&q=80" 
             fill 
             alt="The Midnight Collection"
             className="object-cover object-top opacity-70 group-hover:scale-[1.03] transition-transform duration-[2s] ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
           
           <div className="absolute bottom-10 left-8 md:left-12 z-10">
             <span className="inline-block px-3 py-1 border border-white text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-4 bg-black/20 backdrop-blur-sm">
               Limited Capsule
             </span>
             <h3 className="text-[32px] md:text-[48px] font-bold leading-none tracking-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
               The Midnight Collection
             </h3>
           </div>
        </div>

        {/* Content / Timer Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative bg-[#050505]">
           <div className="w-full max-w-md relative z-10">
              <AnimatePresence mode="wait">
                {!isLive ? (
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-12">
                      <span className="text-[11px] text-gray-400 font-medium uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Dropping Soon
                      </span>
                      <h2 className="text-[40px] md:text-[56px] font-bold tracking-tighter leading-[1.1] mb-5">
                        Access Restricted.
                      </h2>
                      <p className="text-gray-400 text-[15px] font-medium leading-relaxed max-w-sm">
                        The ultimate evening wear capsule. Extremely limited quantities. Unlock access when the clock hits zero.
                      </p>
                    </div>

                    {/* Typographic Timer */}
                    <div className="flex items-end gap-3 md:gap-6 mb-16 border-b border-white/10 pb-8">
                      {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hrs', value: timeLeft.hours },
                        { label: 'Min', value: timeLeft.minutes },
                        { label: 'Sec', value: timeLeft.seconds }
                      ].map((item, i, arr) => (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center">
                            <span className="text-[36px] md:text-[48px] font-light tabular-nums tracking-tight leading-none">
                              {item.value.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2 font-bold">{item.label}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <span className="text-[24px] md:text-[32px] font-light text-white/20 leading-none mb-6">:</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Notify Form */}
                    <div className="relative">
                      {isSubmitted ? (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="w-full text-white font-medium text-[14px] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">done_all</span>
                          You are on the list.
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                           <label htmlFor="drop-email" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-300">Join The Waitlist</label>
                           <div className="flex flex-col sm:flex-row gap-4 items-end">
                             <input 
                               type="email" 
                               id="drop-email"
                               required
                               placeholder="Email address" 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="flex-1 w-full bg-transparent border-b border-white/30 text-white px-0 py-3 focus:outline-none focus:border-white transition-colors text-[16px] placeholder:text-gray-600 rounded-none"
                             />
                             <button type="submit" className="w-full sm:w-auto bg-white text-black font-bold uppercase tracking-[0.15em] text-[11px] px-8 py-4 hover:bg-gray-200 transition-colors whitespace-nowrap">
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
                     <div className="inline-flex items-center gap-2 px-3 py-1 border border-white mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Now Live</span>
                     </div>
                     <h2 className="text-[48px] md:text-[64px] font-bold tracking-tighter leading-none mb-6">
                        The Drop is Open.
                     </h2>
                     <p className="text-gray-400 text-[16px] mb-10 max-w-sm">
                        The Midnight Collection is officially available. Secure your pieces before they are gone forever.
                     </p>
                     <button className="bg-white text-black font-bold uppercase tracking-widest text-[12px] px-12 py-5 hover:bg-gray-200 transition-colors">
                        Enter Collection
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

