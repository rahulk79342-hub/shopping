"use client";
import { useState } from 'react';

export default function PromotionsBuilder() {
  const [promos, setPromos] = useState([
    { id: 1, code: 'SUMMER20', type: 'percentage', amount: 20, active: true },
    { id: 2, code: 'WELCOME10', type: 'fixed', amount: 10, active: true }
  ]);
  
  const [code, setCode] = useState('');
  const [type, setType] = useState('percentage');
  const [amount, setAmount] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!code || !amount) return;
    
    setPromos([
      { id: Date.now(), code: code.toUpperCase(), type, amount: Number(amount), active: true },
      ...promos
    ]);
    setCode('');
    setAmount('');
  };

  const toggleActive = (id) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-[var(--font-family-headline-md)] text-3xl">Promotions Builder</h1>
        <p className="text-[var(--color-outline)] text-[14px]">Create and manage discount codes for your store.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Builder Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-[var(--color-outline-variant)] shadow-sm h-fit">
          <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4">New Promo Code</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-[var(--font-family-label-caps)] text-[var(--color-outline)] mb-2">Code Name</label>
              <input 
                type="text" 
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. FALL50" 
                className="w-full border border-[var(--color-outline-variant)] p-3 rounded-md text-[14px] focus:outline-none focus:border-black uppercase"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-[var(--font-family-label-caps)] text-[var(--color-outline)] mb-2">Discount Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border border-[var(--color-outline-variant)] p-3 rounded-md text-[14px] focus:outline-none focus:border-black"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-[var(--font-family-label-caps)] text-[var(--color-outline)] mb-2">Amount</label>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="20" 
                className="w-full border border-[var(--color-outline-variant)] p-3 rounded-md text-[14px] focus:outline-none focus:border-black"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Generate Code
            </button>
          </form>
        </div>

        {/* Active Codes List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4">Active Codes</h2>
          {promos.map(promo => (
            <div key={promo.id} className={`flex items-center justify-between p-5 rounded-xl border transition-colors ${promo.active ? 'bg-white border-[var(--color-outline-variant)] shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[18px] ${promo.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                  {promo.type === 'percentage' ? '%' : '$'}
                </div>
                <div>
                  <h3 className="font-bold text-[18px] font-[var(--font-family-headline-md)] tracking-wide">{promo.code}</h3>
                  <p className="text-[12px] text-[var(--color-outline)]">
                    {promo.type === 'percentage' ? `${promo.amount}% off entire order` : `$${promo.amount} off entire order`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] uppercase tracking-widest font-[var(--font-family-label-caps)] ${promo.active ? 'text-green-600' : 'text-gray-400'}`}>
                  {promo.active ? 'Active' : 'Disabled'}
                </span>
                <button 
                  onClick={() => toggleActive(promo.id)}
                  className={`px-4 py-2 rounded-md text-[11px] font-[var(--font-family-label-caps)] uppercase tracking-widest transition-colors ${promo.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                >
                  {promo.active ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
