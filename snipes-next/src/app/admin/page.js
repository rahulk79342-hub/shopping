"use client";
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockRevenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const mockOrders = [
  { id: 'ORD-101', customer: 'john@example.com', total: 1499, status: 'pending' },
  { id: 'ORD-102', customer: 'sarah@example.com', total: 3999, status: 'fulfilled' },
  { id: 'ORD-103', customer: 'mike@example.com', total: 2499, status: 'pending' },
];

const mockInventory = [
  { id: 'PROD-A', name: 'Premium Comfort Tee', size: 'M', stock: 2 },
  { id: 'PROD-B', name: 'Urban Cargo Pants', size: '32', stock: 0 },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => setMounted(true), []);

  const handleFulfill = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'fulfilled' } : o));
  };

  if (!mounted) return null; // Prevent hydration mismatch with Recharts

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="font-[var(--font-family-headline-md)] text-3xl">Dashboard Overview</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest flex items-center gap-2 shadow-sm border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Sync Active
        </div>
      </header>

      {/* Analytics Chart */}
      <section className="bg-white p-6 rounded-xl border border-[var(--color-outline-variant)] shadow-sm">
        <h2 className="font-[var(--font-family-headline-md)] text-lg mb-6">Revenue Trend (YTD)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(val) => `$${val}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`$${value}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Management */}
        <section className="bg-white p-6 rounded-xl border border-[var(--color-outline-variant)] shadow-sm">
          <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4 flex items-center justify-between">
            Recent Orders
            <span className="text-[12px] bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-bold">{orders.filter(o => o.status === 'pending').length} Pending</span>
          </h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-[var(--color-outline-variant)] rounded-lg">
                <div>
                  <p className="font-bold text-[14px]">{order.id}</p>
                  <p className="text-[12px] text-[var(--color-outline)]">{order.customer}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="font-[var(--font-family-price-display)] text-[14px]">Rs. {order.total}</p>
                  {order.status === 'pending' ? (
                    <button 
                      onClick={() => handleFulfill(order.id)}
                      className="bg-black text-white text-[11px] font-[var(--font-family-label-caps)] uppercase tracking-widest px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Fulfill
                    </button>
                  ) : (
                    <span className="text-green-600 text-[11px] font-[var(--font-family-label-caps)] uppercase tracking-widest px-4 py-2 bg-green-50 rounded-md">
                      Fulfilled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inventory Alerts */}
        <section className="bg-white p-6 rounded-xl border border-[var(--color-outline-variant)] shadow-sm">
          <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4 flex items-center gap-2 text-red-600">
            <span className="material-symbols-outlined">warning</span>
            Low Stock Alerts
          </h2>
          <div className="space-y-4">
            {mockInventory.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-lg">
                <div>
                  <p className="font-bold text-[14px]">{item.name}</p>
                  <p className="text-[12px] text-red-700">Size: {item.size}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[18px] text-red-600">{item.stock}</p>
                  <p className="text-[10px] uppercase tracking-widest font-[var(--font-family-label-caps)] text-red-700">Remaining</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
