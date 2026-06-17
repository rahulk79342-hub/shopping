"use client";
import React from 'react';
import Link from 'next/link';

export default function StoreLocatorBanner() {
  return (
    <section className="w-full bg-[#f3f3f3] my-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">
        
        {/* Mobile: Image on Top, Desktop: Image on Right (Order handled by flex-col-reverse on mobile) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black uppercase leading-tight mb-4 tracking-tighter">
            Find Your<br/>Near By Snipes
          </h2>
          <p className="text-[14px] text-gray-600 mb-8 max-w-md">
            Experience our premium collection in person. Visit our flagship stores to try on our latest drops and get personalized styling advice.
          </p>
          <Link href="/pages/store-locator" className="bg-black text-white px-8 py-3 w-fit text-[13px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Store Locator
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gray-300 order-1 md:order-2 relative bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          {/* Placeholder for actual storefront image */}
        </div>

      </div>
    </section>
  );
}
