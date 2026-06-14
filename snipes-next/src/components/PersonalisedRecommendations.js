"use client";
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: 101,
    name: "Heavyweight Box Tee",
    price: 999,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW",
    tag: "Just For You"
  },
  {
    id: 102,
    name: "Relaxed Linen Trousers",
    price: 1899,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN"
  },
  {
    id: 103,
    name: "Summer Overshirt",
    price: 1599,
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"
  },
  {
    id: 104,
    name: "Textured Polo",
    price: 1199,
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio"
  }
];

export default function PersonalisedRecommendations() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState('Priya');

  // Toggle for demonstration purposes
  const toggleLoginState = () => setIsLoggedIn(!isLoggedIn);

  return (
    <section className="w-full px-4 py-12 md:py-20 max-w-screen-2xl mx-auto bg-white border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
        <div>
          <span className="font-bold text-[10px] uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI-Powered
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-black tracking-tighter leading-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            {isLoggedIn ? `Picked for you, ${userName}` : "Based on what's trending"}
          </h2>
          <p className="text-gray-500 text-[14px] mt-2">
            {isLoggedIn ? "Curated based on your browsing and wishlist signals." : "Top picks for the season. Log in for custom recommendations."}
          </p>
        </div>
        
        {/* Demo Toggle Button */}
        <button 
          onClick={toggleLoginState}
          className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black border-b border-gray-300 hover:border-black transition-colors"
        >
          Toggle Auth State
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
