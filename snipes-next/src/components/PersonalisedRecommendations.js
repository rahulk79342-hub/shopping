"use client";
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: 101,
    name: "Heavyweight Box Tee",
    price: 999,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    tag: "Just For You"
  },
  {
    id: 102,
    name: "Relaxed Linen Trousers",
    price: 1899,
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 103,
    name: "Summer Overshirt",
    price: 1599,
    img: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 104,
    name: "Textured Polo",
    price: 1199,
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PersonalisedRecommendations() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState('');

  // Toggle for demonstration purposes
  const toggleLoginState = () => setIsLoggedIn(!isLoggedIn);

  return (
    <section className="w-full px-4 md:px-8 xl:px-12 py-12 md:py-20 max-w-screen-2xl mx-auto bg-white border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
        <div>
          <h3 className="text-[28px] md:text-[40px] font-bold text-black tracking-tighter leading-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            {isLoggedIn ? `Picked for you ${userName}` : "Based on what's trending"}
          </h3>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
