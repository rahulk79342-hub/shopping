"use client";
import { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { MdOutlineCheckCircle, MdOutlineCloudUpload, MdOutlineAccountBalanceWallet, MdOutlineSwapHoriz } from 'react-icons/md';


// Initialize Supabase Client for Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Mock Order Data to represent items to return
const MOCK_ORDER = {
  id: "ORD-12345",
  items: [
    { id: 1, name: "Premium Comfort Tee", price: 1499, size: "M", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Urban Cargo Pants", price: 3999, size: "32", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80" }
  ]
};

function ReturnsFormContent({ orderId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'customer@example.com';
  
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [resolution, setResolution] = useState('credit'); // 'credit' or 'exchange'
  const [reason, setReason] = useState('');
  
  // File Upload State
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    if (!supabase) {
      setErrorMessage("Supabase keys missing. File cannot be uploaded to Storage.");
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${orderId}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('returns')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('returns').getPublicUrl(filePath);
      setPhotoUrl(data.publicUrl);
    } catch (error) {
      console.error('Upload Error:', error);
      setErrorMessage('Failed to upload image. Does the "returns" bucket exist and have public RLS?');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItemId || !reason) {
      setErrorMessage("Please select an item and a reason.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const selectedItem = MOCK_ORDER.items.find(i => i.id === selectedItemId);

    try {
      const res = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          email,
          item: selectedItem,
          reason,
          resolution,
          photoUrl
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
         throw new Error(data.error || 'Server error occurred');
      }

      // Success! Redirect to confirmation with label URL
      router.push(`/returns/success?returnId=${data.returnId}&labelUrl=${encodeURIComponent(data.labelUrl)}`);

    } catch (error) {
       console.error("Submit Error:", error);
       setErrorMessage(error.message);
       setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-[var(--color-outline-variant)] py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)]">
          DEMO
        </Link>
        <div className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-outline)]">
          Order {orderId}
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <h1 className="font-[var(--font-family-headline-md)] text-2xl mb-8">Start your return</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Select Item */}
          <section className="bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
            <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4">1. Select Item to Return</h2>
            <div className="space-y-4">
              {MOCK_ORDER.items.map(item => (
                <label 
                  key={item.id} 
                  className={`flex gap-4 p-4 border rounded-[var(--border-radius-sm)] cursor-pointer transition-colors ${selectedItemId === item.id ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-low)]'}`}
                >
                  <input 
                    type="radio" 
                    name="return_item" 
                    value={item.id} 
                    checked={selectedItemId === item.id}
                    onChange={() => setSelectedItemId(item.id)}
                    className="mt-1 accent-[var(--color-primary)]"
                  />
                  <div className="w-16 aspect-[3/4] relative bg-[var(--color-surface-container)] rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px]">{item.name}</h3>
                    <p className="text-[12px] text-[var(--color-outline)] mb-1">Size: {item.size}</p>
                    <p className="font-[var(--font-family-price-display)] text-[14px]">Rs. {item.price}.00</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <AnimatePresence>
            {selectedItemId && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-8"
              >
                
                {/* Step 2: Reason & Evidence */}
                <section className="bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
                  <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4">2. Why are you returning this?</h2>
                  
                  <select 
                    value={reason} 
                    onChange={e => setReason(e.target.value)}
                    className="w-full border border-[var(--color-outline-variant)] p-4 rounded-[var(--border-radius-sm)] text-[14px] font-[var(--font-family-body-md)] focus:outline-none focus:border-[var(--color-primary)] mb-6"
                  >
                    <option value="" disabled>Select a reason...</option>
                    <option value="too_small">Too small</option>
                    <option value="too_large">Too large</option>
                    <option value="damaged">Damaged or Defective</option>
                    <option value="wrong_item">Received wrong item</option>
                    <option value="not_liked">Didn&apos;t like it</option>
                  </select>

                  <h3 className="font-bold text-[14px] mb-2">Upload Photo Evidence (Optional)</h3>
                  <div className="border-2 border-dashed border-[var(--color-outline-variant)] rounded-[var(--border-radius-sm)] p-6 text-center hover:bg-[var(--color-surface-container-low)] transition-colors relative">
                    {isUploading ? (
                      <p className="text-[14px] text-[var(--color-primary)] animate-pulse font-bold">Uploading to Supabase Storage...</p>
                    ) : photoUrl ? (
                      <div className="flex flex-col items-center">
                        <MdOutlineCheckCircle className="text-green-500 mb-2" />
                        <p className="text-[12px] text-[var(--color-outline)]">Image uploaded successfully</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoUrl} alt="Upload preview" className="h-16 mt-2 rounded-sm" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center cursor-pointer">
                        <MdOutlineCloudUpload className="text-[32px] text-[var(--color-outline)] mb-2" />
                        <p className="text-[14px] text-[var(--color-outline)]">Tap to upload a photo</p>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Step 3: Resolution */}
                <section className="bg-white p-6 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
                  <h2 className="font-[var(--font-family-headline-md)] text-lg mb-4">3. How would you like us to resolve this?</h2>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className={`flex-1 flex flex-col items-center gap-3 p-6 border rounded-[var(--border-radius-sm)] cursor-pointer transition-colors text-center ${resolution === 'credit' ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-low)]'}`}>
                      <input 
                        type="radio" 
                        name="resolution" 
                        value="credit" 
                        checked={resolution === 'credit'}
                        onChange={() => setResolution('credit')}
                        className="hidden"
                      />
                      <MdOutlineAccountBalanceWallet className="text-[32px]" />
                      <div>
                        <h3 className="font-bold text-[14px]">Instant Store Credit</h3>
                        <p className="text-[12px] text-[var(--color-outline)]">Get a gift card instantly upon drop-off. +Rs. 500 Bonus!</p>
                      </div>
                    </label>

                    <label className={`flex-1 flex flex-col items-center gap-3 p-6 border rounded-[var(--border-radius-sm)] cursor-pointer transition-colors text-center ${resolution === 'exchange' ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-low)]'}`}>
                      <input 
                        type="radio" 
                        name="resolution" 
                        value="exchange" 
                        checked={resolution === 'exchange'}
                        onChange={() => setResolution('exchange')}
                        className="hidden"
                      />
                      <MdOutlineSwapHoriz className="text-[32px]" />
                      <div>
                        <h3 className="font-bold text-[14px]">Exchange Item</h3>
                        <p className="text-[12px] text-[var(--color-outline)]">Swap for a different size or color.</p>
                      </div>
                    </label>
                  </div>
                </section>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-[var(--border-radius-sm)] text-[14px]">
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 rounded-[var(--border-radius-sm)] hover:bg-[var(--color-surface-tint)] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Generating Return Label...' : 'Submit & Get Label'}
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </div>
    </>
  );
}

export default function ReturnsFormPage(props) {
  const params = use(props.params);
  const orderId = params.orderId || MOCK_ORDER.id;

  return (
    <main className="min-h-screen bg-[var(--color-surface)] pb-24">
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">Loading...</div>}>
        <ReturnsFormContent orderId={orderId} />
      </Suspense>
    </main>
  );
}
