"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-white pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Account Access</h1>
          <p className="text-gray-500">Please sign in using the icon in the top right corner.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-white pb-24 font-sans">
      <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-12 md:pt-16">
        <h1 className="text-[28px] md:text-[32px] font-bold mb-8 md:mb-10 text-black">Profile</h1>
        
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="border border-gray-200 rounded-[12px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-[15px] font-medium text-black mb-4 flex items-center gap-2">
              {user.name} 
              <span className="material-symbols-outlined text-[16px] text-orange-500 cursor-pointer hover:opacity-80">edit</span>
            </h2>
            <div className="text-[14px]">
              <p className="text-gray-500 mb-1">Email</p>
              <p className="text-black">{user.email}</p>
            </div>
          </div>

          {/* Addresses Card */}
          <div className="border border-gray-200 rounded-[12px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[15px] font-medium text-black">Addresses</h2>
              <button className="text-[14px] text-orange-500 hover:underline flex items-center gap-1 font-medium">
                <span className="text-lg leading-none">+</span> Add
              </button>
            </div>
            
            <div className="bg-[#F9FAFB] rounded-[8px] p-4 flex items-center gap-2 text-gray-500 text-[14px] border border-gray-100">
              <span className="material-symbols-outlined text-[18px]">info</span>
              No addresses added
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 flex gap-6 text-[14px] font-medium">
            <button 
              onClick={() => { logout(); window.location.href = '/'; }} 
              className="text-orange-500 hover:underline transition-all"
            >
              Sign out
            </button>
            <button className="text-orange-500 hover:underline transition-all">
              Sign out of all devices
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
