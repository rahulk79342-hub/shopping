"use client";
import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-[28px] md:text-[40px] font-bold tracking-tighter uppercase mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
          Join the Club
        </h2>
        <p className="text-[14px] md:text-[16px] text-gray-400 mb-8 max-w-md mx-auto">
          Subscribe to our newsletter for early access to new drops, exclusive offers, and styling tips.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="flex-1 bg-transparent border border-gray-600 rounded-full px-6 py-3 text-[14px] focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
            required
          />
          <button 
            type="submit" 
            className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide text-[12px] hover:bg-gray-200 transition-colors"
          >
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
