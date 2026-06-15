"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MdOutlineLocalShipping, MdOutlineInventory2, MdOutlinePrint } from 'react-icons/md';


export default function ReturnsSuccessPage() {
  const searchParams = useSearchParams();
  const returnId = searchParams.get('returnId') || 'RET-UNKNOWN';
  const labelUrl = searchParams.get('labelUrl');

  return (
    <main className="min-h-screen bg-[var(--color-surface)] flex flex-col justify-center items-center px-4 md:px-0 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[600px] bg-white p-8 md:p-12 rounded-[var(--border-radius-lg)] shadow-2xl border border-[var(--color-outline-variant)] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>

        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <MdOutlineLocalShipping className="text-[40px] text-blue-500" />
        </div>
        
        <h1 className="font-[var(--font-family-headline-lg)] text-3xl mb-2 text-[var(--color-primary)]">Return Approved</h1>
        <p className="font-[var(--font-family-body-lg)] text-[var(--color-outline)] mb-8">
          Your return request <strong className="text-black">{returnId}</strong> has been processed.
        </p>

        <div className="bg-[var(--color-surface-container-low)] p-6 rounded-[var(--border-radius-md)] text-left mb-8 border border-[var(--color-outline-variant)]">
          <h3 className="font-bold text-[16px] mb-4 flex items-center gap-2">
            <MdOutlineInventory2 className="text-[20px]" />
            Next Steps
          </h3>
          <ol className="list-decimal pl-5 space-y-3 text-[14px] font-[var(--font-family-body-md)] text-[var(--color-outline)]">
            <li>Download and print your prepaid return label.</li>
            <li>Pack the items securely in their original packaging.</li>
            <li>Attach the label to the outside of the box.</li>
            <li>Drop it off at any authorized carrier location.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          {labelUrl ? (
             <a 
               href={labelUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase py-4 tracking-widest hover:bg-[var(--color-surface-tint)] transition-colors rounded-[var(--border-radius-sm)] flex items-center justify-center gap-3"
             >
               <MdOutlinePrint className="text-[18px]" />
               Download Return Label
             </a>
          ) : (
             <div className="bg-red-50 text-red-600 p-4 text-[12px] rounded-[var(--border-radius-sm)] border border-red-100">
               Live Label URL missing. Ensure your EASYPOST_API_KEY is active.
             </div>
          )}
          
          <Link href="/account" className="w-full bg-white text-[var(--color-primary)] border border-[var(--color-outline-variant)] font-[var(--font-family-label-caps)] text-[12px] uppercase py-4 tracking-widest hover:bg-[var(--color-surface-container)] transition-colors rounded-[var(--border-radius-sm)] block text-center">
            Back to Account
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
