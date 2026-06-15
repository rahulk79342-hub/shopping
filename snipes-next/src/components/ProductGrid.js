"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineShoppingBag } from 'react-icons/md';


export default function ProductGrid({ title, viewAllLink }) {
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
      originalPrice: "₹1499",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
      tag: "Sale"
    }
  ];

  return (
    <section className="w-full px-4 py-8 max-w-screen-2xl mx-auto bg-white my-8 border-y border-[rgba(10,10,10,0.08)]">
      <div className="flex justify-between items-center mb-6 pt-4">
        <h2 className="text-[20px] md:text-[28px] text-black font-medium">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-[14px] text-black hover:underline underline-offset-4">
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer flex flex-col relative">
            <Link href={`/product/${product.id}`} className="relative h-[250px] md:h-[400px] bg-[#f8f8f8] block w-full mb-3">
              <Image 
                src={product.img} 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw" 
                className="object-cover object-top" 
                alt={product.name} 
              />
              {product.tag && (
                <div className={`absolute top-2 right-2 text-white text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold ${product.tag.toLowerCase() === 'sale' ? 'bg-red-600' : 'bg-black'}`}>
                  {product.tag}
                </div>
              )}
              {/* Mobile quick add */}
              <button className="md:hidden absolute bottom-2 right-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-gray-100 z-10 active:scale-95 transition-transform">
                <MdOutlineShoppingBag className="text-[16px] text-black" />
              </button>
            </Link>
            
            <div className="flex flex-col flex-1 px-1 text-left">
              <h3 className="text-[14px] md:text-[15px] text-black mb-1 font-medium">{product.name}</h3>
              <div className="flex items-center gap-2">
                {product.originalPrice && (
                  <p className="text-[14px] text-gray-500 line-through">{product.originalPrice}</p>
                )}
                <p className="text-[14px] text-black font-bold">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
