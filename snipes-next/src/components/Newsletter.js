"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsWhatsApp, setWantsWhatsApp] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setPhone('');
      setWantsWhatsApp(false);
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
<<<<<<< HEAD
    <section className="w-full py-16 bg-white border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-[24px] font-bold text-black mb-2">Join our email list</h2>
        <p className="text-[14px] text-gray-600 mb-6">
          Sign up for new arrivals, offers, and more!
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            className="flex-1 bg-transparent border border-gray-300 px-4 py-3 text-[14px] focus:outline-none focus:border-black transition-colors"
            required
          />
          <button 
            type="submit" 
            className="bg-black text-white px-8 py-3 text-[14px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
=======
    <section className="w-full py-16 md:py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
           <span className="material-symbols-outlined text-[14px]">local_activity</span>
           Welcome Offer
        </span>
        
        <h2 className="text-[32px] md:text-[48px] font-bold tracking-tighter mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Get 10% Off Your First Order.
        </h2>
        <p className="text-[14px] md:text-[16px] text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Sign up to receive your exclusive welcome code, plus get early access to our limited-run drops before anyone else.
        </p>
        
        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4 text-left">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" 
              className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-[14px] focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
              required
            />

            <AnimatePresence>
              {wantsWhatsApp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Number (e.g. +91 98765 43210)" 
                    className="w-full bg-white/5 border border-[#25D366]/50 rounded-xl px-5 py-4 text-[14px] focus:outline-none focus:border-[#25D366] transition-colors text-white placeholder-gray-500 mt-1"
                    required={wantsWhatsApp}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <label className="flex items-start gap-3 cursor-pointer group mt-2 mb-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={wantsWhatsApp}
                  onChange={() => setWantsWhatsApp(!wantsWhatsApp)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded border border-white/30 peer-checked:bg-[#25D366] peer-checked:border-[#25D366] transition-colors flex items-center justify-center">
                   <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all font-bold">check</span>
                </div>
              </div>
              <span className="text-[13px] text-gray-400 group-hover:text-white transition-colors leading-snug">
                Send my 10% code via <strong className="text-white">WhatsApp</strong> instead. (Indian users receive drops 5x faster via WhatsApp).
              </span>
            </label>

            <button 
              type="submit" 
              className={`w-full text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] transition-colors shadow-lg mt-2 ${wantsWhatsApp ? 'bg-[#25D366] hover:bg-[#1ebd59] text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              Unlock 10% Off
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/20 rounded-xl p-8 max-w-md mx-auto"
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-black">
              <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
            </div>
            <h3 className="text-[20px] font-bold mb-2">You're on the list.</h3>
            <p className="text-[14px] text-gray-400">Check your {wantsWhatsApp ? 'WhatsApp' : 'inbox'} for your 10% off welcome code.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
