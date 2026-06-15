import React from 'react';
<<<<<<< HEAD
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
=======

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-24 md:pb-8 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand & About */}
        <div>
          <h3 className="font-bold text-[24px] text-black tracking-tighter mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Snipes Menswear
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
            Premium menswear redefining everyday basics. We blend uncompromising comfort with bold aesthetics.
          </p>
          
          {/* Trust Seals */}
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 rounded text-green-700 text-[10px] font-bold uppercase tracking-widest">
               <span className="material-symbols-outlined text-[14px]">lock</span>
               256-Bit SSL
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded text-blue-700 text-[10px] font-bold uppercase tracking-widest">
               <span className="material-symbols-outlined text-[14px]">verified_user</span>
               Razorpay Secure
             </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-[13px] uppercase tracking-widest text-black mb-6">Shop</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-500">
            <li><a href="#" className="hover:text-black hover:underline transition-all">New Arrivals</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-all">Best Sellers</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-all">VIP Rewards</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-all">Size Guide</a></li>
          </ul>
        </div>

        {/* Support & India Specifics */}
        <div>
          <h3 className="font-bold text-[13px] uppercase tracking-widest text-black mb-6">Support</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-500 mb-6">
            <li><a href="#" className="hover:text-black hover:underline transition-all">Track Order</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-all">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-all">Contact Us</a></li>
          </ul>
          
          {/* India Specific Features */}
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
               <span className="material-symbols-outlined text-[16px] text-black">receipt_long</span>
               GST Invoice Available
             </div>
             <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
               <span className="material-symbols-outlined text-[16px] text-black">payments</span>
               Cash on Delivery (COD) Available
             </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-bold text-[13px] uppercase tracking-widest text-black mb-6">Payment Methods</h3>
          <p className="text-[12px] text-gray-500 mb-4">We accept all major credit cards, UPI, and EMI options.</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">UPI</div>
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">Visa</div>
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">Mastercard</div>
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">RuPay</div>
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">Simpl EMI</div>
             <div className="px-3 py-1.5 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-600 uppercase">COD</div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-bold bg-green-50 w-fit px-3 py-1.5 rounded-full border border-green-100">
             <span className="material-symbols-outlined text-[14px]">stars</span>
             4.8/5 on Trustpilot
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
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

<<<<<<< HEAD
      <div className="max-w-screen-2xl mx-auto px-4 mt-16 pt-8 border-t border-[rgba(10,10,10,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0 text-[12px] text-gray-500">
          <Link href="/policies/privacy-policy" className="hover:text-black">Privacy policy</Link>
          <Link href="/policies/refund-policy" className="hover:text-black">Refund policy</Link>
          <Link href="/policies/terms-of-service" className="hover:text-black">Terms of service</Link>
        </div>
        <div className="text-[12px] text-gray-500">
          © 2026, Snipes Menswear
=======
      <div className="max-w-[1440px] mx-auto px-6 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-gray-400">© 2026 Snipes Menswear. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-black transition-colors"><span className="material-symbols-outlined text-[18px]">camera_alt</span></a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors"><span className="material-symbols-outlined text-[18px]">play_arrow</span></a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors"><span className="material-symbols-outlined text-[18px]">facebook</span></a>
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
        </div>
      </div>
    </footer>
  );
}
