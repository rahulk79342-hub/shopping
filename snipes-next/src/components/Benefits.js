"use client";
import React from 'react';

import { MdOutlineLocalShipping, MdOutlineSyncAlt, MdOutlineSupportAgent } from 'react-icons/md';

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
    <section className="w-full py-16 bg-black">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <feature.icon className="text-[32px] text-white mb-4" />
            <h3 className="text-[16px] font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-[14px] text-gray-400 max-w-xs">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
