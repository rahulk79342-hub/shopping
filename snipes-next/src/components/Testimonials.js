"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul K.",
      text: "The linen shirts fit perfectly and the quality is outstanding. Definitely my new go-to for summer wear.",
      stars: 5
    },
    {
      id: 2,
      name: "Amit S.",
      text: "Premium feel without the luxury markup. The oversized hoodie is incredibly comfortable and stylish.",
      stars: 5
    },
    {
      id: 3,
      name: "Vikram P.",
      text: "Fast shipping and great customer service. The printed shirts are exactly as shown in the pictures.",
      stars: 5
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f8f8]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <h2 className="text-[24px] md:text-[36px] font-bold text-center text-black tracking-tighter uppercase mb-10 md:mb-16" style={{ fontFamily: "Arial, sans-serif" }}>
          What Our Clients Say
        </h2>
        
        <div className="flex overflow-x-auto gap-6 md:gap-8 hide-scrollbar snap-x snap-mandatory pb-8">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-[400px] flex-1 snap-center bg-white p-8 rounded-[16px] shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-black">star</span>
                ))}
              </div>
              <p className="text-[16px] md:text-[18px] text-gray-800 italic leading-relaxed mb-6 flex-1" style={{ fontFamily: "Georgia, serif" }}>
                "{review.text}"
              </p>
              <p className="text-[13px] font-bold text-black uppercase tracking-wider">
                — {review.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
