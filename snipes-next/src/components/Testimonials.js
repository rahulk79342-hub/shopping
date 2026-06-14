"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul K.",
      text: "The linen shirts fit perfectly and the quality is outstanding. Definitely my new go-to for summer wear. Ordered 3 more immediately.",
      stars: 5,
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW"
    },
    {
      id: 2,
      name: "Amit S.",
      text: "Premium feel without the luxury markup. The oversized hoodie is incredibly comfortable and stylish. Fits perfectly to size.",
      stars: 5,
      photo: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio"
    },
    {
      id: 3,
      name: "Vikram P.",
      text: "Fast shipping and great customer service. The printed shirts are exactly as shown in the pictures. Gets compliments every time.",
      stars: 5,
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN"
    },
    {
      id: 4,
      name: "Aditya M.",
      text: "Material is breathable and looks extremely high-end. Paired it with the tailored trousers for an event and it was flawless.",
      stars: 5,
      photo: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        
        {/* Header with Aggregate Stats */}
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
             <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => (
                 <span key={i} className="material-symbols-outlined text-[18px] text-black" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
               ))}
             </div>
             <span className="font-bold text-[14px] md:text-[16px] text-gray-800 tracking-tight">4.8 stars <span className="font-normal text-gray-400 mx-1">·</span> 2,341 reviews</span>
          </div>
          <h2 className="text-[32px] md:text-[48px] font-bold text-center text-black tracking-tighter" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Real People. Real Fits.
          </h2>
        </div>
        
        {/* Review Cards Grid */}
        <div className="flex overflow-x-auto gap-6 md:gap-8 hide-scrollbar snap-x snap-mandatory pb-8 pt-4 -mx-4 px-4 md:mx-0 md:px-0">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="min-w-[85vw] md:min-w-[400px] flex-1 snap-center bg-[#f8f8f8] rounded-[24px] overflow-hidden flex flex-col hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              {/* Photo Review Section */}
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden">
                 <Image src={review.photo} fill className="object-cover hover:scale-105 transition-transform duration-700" alt={`Review by ${review.name}`} />
                 {/* Rating overlay on photo */}
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex gap-0.5 shadow-sm">
                    {[...Array(review.stars)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[12px] text-black" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                 </div>
              </div>

              {/* Text Review Section */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="text-[15px] md:text-[16px] text-gray-800 leading-relaxed mb-6 flex-1" style={{ fontFamily: "Arial, sans-serif" }}>
                  "{review.text}"
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
                   <span className="font-bold text-[14px] text-black uppercase tracking-widest flex items-center gap-2">
                     {review.name}
                   </span>
                   {/* Verified Purchase Badge */}
                   <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                     <span className="material-symbols-outlined text-[14px]">verified</span>
                     Verified
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
