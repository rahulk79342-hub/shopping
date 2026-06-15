"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard, MdOutlineSell, MdOutlineEditNote, MdOutlineStorefront } from 'react-icons/md';


export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Don't wrap the embedded Sanity Studio with our custom layout so it can take full screen
  if (pathname.startsWith('/admin/studio')) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[var(--color-surface-container)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <h1 className="font-[var(--font-family-display-lg)] text-2xl font-extrabold tracking-tighter text-white">
            SNIPES <span className="text-[var(--color-primary)]">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-[var(--font-family-body-md)] text-[14px] transition-colors ${pathname === '/admin' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <MdOutlineDashboard className="text-[20px]" />
            Dashboard
          </Link>
          <Link 
            href="/admin/promotions" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-[var(--font-family-body-md)] text-[14px] transition-colors ${pathname === '/admin/promotions' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <MdOutlineSell className="text-[20px]" />
            Promotions
          </Link>
          <Link 
            href="/admin/studio" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-[var(--font-family-body-md)] text-[14px] transition-colors text-gray-400 hover:text-white hover:bg-white/5`}
          >
            <MdOutlineEditNote className="text-[20px]" />
            CMS (Sanity)
          </Link>
        </nav>

        <div className="p-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-[14px] font-[var(--font-family-body-md)]">
            <MdOutlineStorefront className="text-[20px]" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
