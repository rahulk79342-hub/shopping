import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-24 md:pb-8 border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

        {/* Brand & About */}
        <div>
          <h3 className="font-bold text-[24px] text-black tracking-tighter mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Snipes Menswear
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
            Premium menswear redefining everyday basics. We blend uncompromising comfort with bold aesthetics.
          </p>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-[13px] uppercase tracking-widest text-black mb-6">Shop</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-500">
            <li><Link href="/discover" className="hover:text-black hover:underline transition-all">New Arrivals</Link></li>
            <li><Link href="/discover?sort=trending" className="hover:text-black hover:underline transition-all">Best Sellers</Link></li>
            <li><Link href="/account" className="hover:text-black hover:underline transition-all">VIP Rewards</Link></li>
            <li><Link href="/discover" className="hover:text-black hover:underline transition-all">Size Guide</Link></li>
          </ul>
        </div>

        {/* Support & India Specifics */}
        <div>
          <h3 className="font-bold text-[13px] uppercase tracking-widest text-black mb-6">Support</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-500 mb-6">
            <li><Link href="/account/history" className="hover:text-black hover:underline transition-all">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-black hover:underline transition-all">Returns & Exchanges</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition-all">Contact Us</Link></li>
          </ul>

        </div>

      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-gray-400">© 2026 Snipes Menswear. All rights reserved.</p>
      </div>
    </footer>
  );
}
