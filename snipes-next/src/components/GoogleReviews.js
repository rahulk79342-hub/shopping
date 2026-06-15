"use client";
import React from 'react';
import { MdOutlineStar } from 'react-icons/md';


const REVIEWS = [
  { id: 1, name: "Rahul S.", text: "The fit is perfect and the material is very comfortable. Will definitely buy again.", rating: 5, time: "2 days ago" },
  { id: 2, name: "Vikram K.", text: "Fast delivery and great packaging. The shirt looks exactly like the pictures.", rating: 5, time: "1 week ago" },
  { id: 3, name: "Aditya M.", text: "Premium quality at a good price. The Gurkha pants are my new favorite.", rating: 5, time: "2 weeks ago" },
  { id: 4, name: "Sameer J.", text: "Good customer service. Had an issue with sizing and they replaced it immediately.", rating: 4, time: "3 weeks ago" },
];

export default function GoogleReviews() {
  return (
    <section className="w-full py-12 bg-white border-y border-gray-100 my-8">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-[20px] font-bold text-black mb-2">Excellent</h2>
          <div className="flex gap-1 text-[#FFB400] mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdOutlineStar key={star} className="fill-current" />
            ))}
          </div>
          <p className="text-[14px] text-gray-500 mb-4">Based on <strong>458 reviews</strong></p>
          <div className="flex items-center gap-2 text-[14px] font-medium">
             <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[12px] font-bold">G</span>
             Google
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="w-full flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
          {REVIEWS.map((review) => (
            <div key={review.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-[#f9f9f9] p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-[#FFB400] mb-3 text-[14px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-[16px]">{star <= review.rating ? 'star' : 'star_border'}</span>
                  ))}
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed mb-4">"{review.text}"</p>
              </div>
              <div className="flex justify-between items-center text-[12px] text-gray-500">
                <span className="font-bold text-black">{review.name}</span>
                <span>{review.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-blue-700 transition-colors">
          Review us on Google
        </button>

      </div>
    </section>
  );
}
