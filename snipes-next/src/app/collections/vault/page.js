import Link from 'next/link';

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl">
        <span className="material-symbols-outlined text-[64px] text-red-500 mb-8 block opacity-80 animate-pulse">lock</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">The Vault</h1>
        <p className="text-xl text-gray-400 mb-12 font-light">
          Access denied. The Vault contains exclusive, unreleased drops and requires a VIP pass to enter. Check back during the next drop window.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
        >
          Return to Surface
        </Link>
      </div>
    </main>
  );
}
