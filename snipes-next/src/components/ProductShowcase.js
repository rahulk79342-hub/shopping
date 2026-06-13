"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: "Vintage Wash Tee",
      price: "₹899",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW",
      tag: "Trending"
    },
    {
      id: 2,
      name: "Classic Chinos",
      price: "₹1499",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN"
    },
    {
      id: 3,
      name: "Linen Blend Shirt",
      price: "₹1299",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"
    },
    {
      id: 4,
      name: "Polo Shirt",
      price: "₹999",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio"
    }
  ];

  return (
    <section className="w-full px-4 py-12 md:py-20 max-w-screen-2xl mx-auto bg-white">
      <div className="flex justify-between items-end mb-6 md:mb-10">
        <h2 className="text-[24px] md:text-[36px] font-bold text-black tracking-tighter uppercase" style={{ fontFamily: "Arial, sans-serif" }}>The Essentials</h2>
        <Link href="/discover" className="text-[12px] md:text-[14px] text-gray-500 hover:text-black transition-colors font-medium border-b border-transparent hover:border-black pb-0.5">
          Shop All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer flex flex-col">
            <Link href={`/product/${product.id}`} className="relative h-[250px] md:h-[400px] rounded-[12px] md:rounded-[16px] overflow-hidden mb-3 md:mb-4 bg-[#f8f8f8] block w-full">
              <Image 
                src={product.img} 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw" 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                alt={product.name} 
              />
              {product.tag && (
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm text-black text-[9px] md:text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  {product.tag}
                </div>
              )}
            </Link>
            <div className="flex flex-col flex-1 px-1">
              <h3 className="font-bold text-[13px] md:text-[15px] text-black leading-tight mb-1">{product.name}</h3>
              <p className="text-[12px] md:text-[14px] text-gray-600 font-medium">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
