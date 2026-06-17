"use client";
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function AccountPopover({ isOpen, onClose }) {
  const { user, login, logout } = useAuthStore();
  const [email, setEmail] = useState('rahulk79342@gmail.com');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      login({ name: 'Rahul', email: email });
    }
  };

  const handleSocialLogin = (provider) => {
    login({ name: 'Rahul', email: `rahul@${provider}.com` });
  };

  return (
    <>
      {/* Invisible overlay for mobile to close when clicking outside */}
      <div className="fixed inset-0 z-40 sm:hidden" onClick={onClose}></div>

      <div className="fixed top-[78px] left-1/2 -translate-x-1/2 md:absolute md:top-full md:left-auto md:right-0 md:translate-x-0 md:mt-2 w-[calc(100vw-32px)] md:w-[380px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden transform md:origin-top-right">
        <div className="p-6 relative ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {!user ? (
            // UNAUTHENTICATED STATE
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 pr-8 tracking-tight">Sign in or create account</h2>

              <button
                onClick={() => handleSocialLogin('shop')}
                className="w-full bg-[#5A31F4] hover:bg-[#4d2ad1] text-white font-medium py-3.5 rounded-[14px] transition-colors mb-4 flex items-center justify-center gap-2"
              >
                Sign in with <span className="font-bold text-lg tracking-tighter">shop</span>
              </button>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="flex-1 border border-gray-200 rounded-[14px] py-3.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex-1 border border-gray-200 rounded-[14px] py-3.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <hr className="flex-1 border-gray-200" />
                <span className="text-[11px] text-gray-500 font-medium">OR</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              <form onSubmit={handleLogin} className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

                <label className="flex items-center gap-3 mt-5 cursor-pointer">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-black rounded-[4px] checked:bg-black transition-colors cursor-pointer" defaultChecked />
                    <span className="material-symbols-outlined absolute text-white text-[14px] pointer-events-none opacity-0 peer-checked:opacity-100">check</span>
                  </div>
                  <span className="text-[14px] text-gray-800">Email me with news and offers</span>
                </label>
              </form>
            </div>
          ) : (
            // AUTHENTICATED STATE
            <div className="pt-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Hi, {user.name}</h2>
              <p className="text-[15px] text-gray-500">{user.email}</p>
            </div>
          )}

          {/* SHARED BOTTOM BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-3 border border-gray-200 rounded-[12px] py-3.5 px-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px] text-[#2c4bc4]">inventory_2</span>
              <span className="text-[15px] font-semibold text-gray-900">Orders</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 border border-gray-200 rounded-[12px] py-3.5 px-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px] text-[#2c4bc4]">favorite</span>
              <span className="text-[15px] font-semibold text-gray-900">Wishlist</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-3 border border-gray-200 rounded-[12px] py-3.5 px-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px] text-[#2c4bc4]">redeem</span>
              <span className="text-[15px] font-semibold text-gray-900">Coupons</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-3 border border-gray-200 rounded-[12px] py-3.5 px-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px] text-[#2c4bc4]">support_agent</span>
              <span className="text-[15px] font-semibold text-gray-900">Help Center</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
