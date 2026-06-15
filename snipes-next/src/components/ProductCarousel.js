"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineShoppingBag } from 'react-icons/md';


export default function ProductCarousel({ title, viewAllLink }) {
  const products = [
    {
      id: 5,
      name: "Beige Gurkha Pants",
      price: "₹1899",
      img: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop",
      tag: "Best Seller"
    },
    {
      id: 6,
      name: "Navy Blue Gurkhas",
      price: "₹1899",
      img: "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Olive Green Gurkhas",
      price: "₹1999",
      img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Charcoal Gurkhas",
      price: "₹1799",
      originalPrice: "₹2499",
      img: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop",
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

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[200px] md:min-w-[280px] w-[60vw] md:w-[280px] flex-shrink-0 snap-start group cursor-pointer flex flex-col relative">
            <Link href={`/product/${product.id}`} className="relative h-[250px] md:h-[400px] bg-[#f8f8f8] block w-full mb-3">
              <Image 
                src={product.img} 
                fill 
                sizes="(max-width: 768px) 60vw, 25vw" 
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
