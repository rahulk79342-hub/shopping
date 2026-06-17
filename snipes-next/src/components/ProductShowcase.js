"use client";
import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: "Vintage Wash Tee",
    price: "₹899",
    img: "https://i.imgur.com/UcsGO7E.jpeg",
    tag: "Trending",
    colors: [
      { name: "Washed Black", hex: "#333333", img: "https://i.imgur.com/eGOUveI.jpeg" },
      { name: "Desert Sand", hex: "#d1bfae", img: "https://i.imgur.com/YIq57b6.jpeg" }
    ]
  },
  {
    id: 2,
    name: "Classic Chinos",
    price: "₹1499",
    img: "https://i.imgur.com/UsFIvYs.jpeg",
    colors: [
      { name: "Khaki", hex: "#c3b091", img: "https://i.imgur.com/oO5OUjb.jpeg" },
      { name: "Navy", hex: "#000080", img: "https://i.imgur.com/xGQOw3p.jpeg" }
    ]
  },
  {
    id: 3,
    name: "Linen Blend Shirt",
    price: "₹1299",
    img: "https://i.imgur.com/KeqG6r4.jpeg",
    colors: [
      { name: "Sky Blue", hex: "#87ceeb", img: "https://i.imgur.com/kKc9A5p.jpeg" },
      { name: "White", hex: "#ffffff", img: "https://i.imgur.com/N1GkCIR.jpeg" }
    ]
  },
  {
    id: 4,
    name: "Polo Shirt",
    price: "₹999",
    img: "https://i.imgur.com/cBuLvBi.jpeg",
    colors: [
      { name: "Forest", hex: "#228b22", img: "https://i.imgur.com/KcT6BE0.jpeg" }
    ]
  }
];


export default function ProductShowcase() {
  return (
    <section className="w-full px-4 md:px-8 xl:px-12 py-12 md:py-20 max-w-screen-2xl mx-auto bg-white">
      <div className="flex justify-between items-end mb-6 md:mb-10">
        <h2 className="text-[24px] md:text-[36px] font-bold text-black tracking-tighter uppercase" style={{ fontFamily: "Arial, sans-serif" }}>The Essentials</h2>
        <Link href="/discover" className="text-[12px] md:text-[14px] text-gray-500 hover:text-black transition-colors font-bold border-b-2 border-transparent hover:border-black pb-0.5 uppercase tracking-widest">
          Shop All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
