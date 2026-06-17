"use client";
import React from 'react';

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      icon: "local_shipping",
      title: "Carbon-Neutral Shipping",
      description: "Free & 100% offset on all orders"
    },
    {
      id: 2,
      icon: "eco",
      title: "Sustainable Fabrics",
      description: "Made from 100% organic cotton"
    },
    {
      id: 3,
      icon: "sync_alt",
      title: "Easy Returns",
      description: "14-day hassle-free policy"
    },
    {
      id: 4,
      icon: "lock",
      title: "Secure Payments",
      description: "256-bit encrypted checkout"
    }
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-[#f8f8f8]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] text-black">
                  {benefit.icon}
                </span>
              </div>
              <h3 className="font-bold text-[13px] md:text-[15px] text-black mb-2 uppercase tracking-widest">
                {benefit.title}
              </h3>
              <p className="text-[13px] md:text-[14px] text-gray-500 max-w-[200px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
