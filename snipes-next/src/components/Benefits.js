"use client";
import React from 'react';

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      icon: "local_shipping",
      title: "Free Shipping",
      description: "On all orders over ₹2000"
    },
    {
      id: 2,
      icon: "verified",
      title: "Premium Quality",
      description: "Finest fabrics & craftsmanship"
    },
    {
      id: 3,
      icon: "support_agent",
      title: "24/7 Support",
      description: "Always here to help you"
    },
    {
      id: 4,
      icon: "sync_alt",
      title: "Easy Returns",
      description: "14-day return policy"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[32px] md:text-[40px] text-black mb-4">
                {benefit.icon}
              </span>
              <h3 className="font-bold text-[14px] md:text-[16px] text-black mb-1 uppercase tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-[12px] md:text-[14px] text-gray-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
