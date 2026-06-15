import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f3f3f3] pt-16 pb-8 border-t border-[rgba(10,10,10,0.08)]">
      <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
        
        {/* Massive Logo / Newsletter Area */}
        <div className="flex flex-col gap-6 md:w-1/3 order-1 md:order-2">
          <h2 className="text-[48px] md:text-[64px] font-bold text-black uppercase tracking-tighter leading-none" style={{ fontFamily: "Arial, sans-serif" }}>
            SNIPES
          </h2>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[16px] text-black">Subscribe to our emails</h3>
            <div className="flex w-full mt-2 border border-black overflow-hidden">
              <input type="email" placeholder="Email" className="flex-1 bg-transparent px-4 py-2 text-[14px] focus:outline-none" />
              <button className="bg-black text-white px-4 py-2 text-[14px] font-bold">→</button>
            </div>
          </div>
        </div>

        {/* Links Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-1/2 order-2 md:order-1">
          {/* Link Column 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[16px] text-black mb-2">Quick links</h3>
            <Link href="/pages/about-us" className="text-[14px] text-gray-600 hover:text-black">About Us</Link>
            <Link href="/pages/refund-and-returns-policy" className="text-[14px] text-gray-600 hover:text-black">Refund and Returns Policy</Link>
            <Link href="/pages/privacy-policy" className="text-[14px] text-gray-600 hover:text-black">Privacy Policy</Link>
            <Link href="/pages/terms-conditions" className="text-[14px] text-gray-600 hover:text-black">Terms & Conditions</Link>
          </div>

          {/* Link Column 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[16px] text-black mb-2">Info</h3>
            <Link href="/pages/contact" className="text-[14px] text-gray-600 hover:text-black">Contact Us</Link>
            <Link href="/pages/store-locator" className="text-[14px] text-gray-600 hover:text-black">Store Locator</Link>
            <Link href="/blogs/fashion-tips" className="text-[14px] text-gray-600 hover:text-black">Fashion Tips</Link>
          </div>
        </div>

      </div>

      <div className="max-w-screen-2xl mx-auto px-4 mt-16 pt-8 border-t border-[rgba(10,10,10,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0 text-[12px] text-gray-500">
          <Link href="/policies/privacy-policy" className="hover:text-black">Privacy policy</Link>
          <Link href="/policies/refund-policy" className="hover:text-black">Refund policy</Link>
          <Link href="/policies/terms-of-service" className="hover:text-black">Terms of service</Link>
        </div>
        <div className="text-[12px] text-gray-500">
          © 2026, Snipes Menswear
        </div>
      </div>
    </footer>
  );
}
