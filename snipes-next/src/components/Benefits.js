"use client";
import React from 'react';

<<<<<<< HEAD
import { MdOutlineLocalShipping, MdOutlineSyncAlt, MdOutlineSupportAgent } from 'react-icons/md';
=======
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
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39

const FEATURES = [
  {
    icon: MdOutlineLocalShipping,
    title: "Fast & Reliable Delivery",
    desc: "Get your orders delivered safely and on time, right to your doorstep."
  },
  {
    icon: MdOutlineSyncAlt,
    title: "Easy Returns & Exchanges",
    desc: "Not satisfied? No worries. Hassle-free returns and exchanges made simple."
  },
  {
    icon: MdOutlineSupportAgent,
    title: "Customer Support",
    desc: "We're here for you quick responses, and a smooth shopping experience every time."
  }
];

export default function Benefits() {
  return (
<<<<<<< HEAD
    <section className="w-full py-16 bg-black">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <feature.icon className="text-[32px] text-white mb-4" />
            <h3 className="text-[16px] font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-[14px] text-gray-400 max-w-xs">{feature.desc}</p>
          </div>
        ))}
=======
    <section className="w-full py-16 md:py-20 bg-[#f8f8f8]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
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
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
      </div>
    </section>
  );
}
