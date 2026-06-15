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
          >
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
