"use client";
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { MdOutlineLocalShipping, MdOutlineNotificationsActive } from 'react-icons/md';


export default function TrackingPage(props) {
  // Use React.use() to unwrap params in Next.js 15+ if needed, or just destructure if 14
  // Assuming App Router standard passing
  const params = use(props.params);
  const orderId = params.id;
  
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Web Push Hook
  const { isSupported, subscribeToPush, message: pushMessage } = usePushNotifications();
  
  // Realtime Supabase Hook
  const { realtimeStatus } = useSupabaseTracking(orderId);

  useEffect(() => {
    // Fetch from our EasyPost API route
    const fetchTracking = async () => {
      try {
        const res = await fetch(`/api/tracking?code=${orderId}`);
        const data = await res.json();
        if (data.success) {
          setTrackingData(data.tracking);
        }
      } catch (err) {
        console.error("Failed to load tracking data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracking();
  }, [orderId]);

  // If Supabase pushes a realtime update, overlay it on the EasyPost data
  const currentStatus = realtimeStatus || trackingData?.status || 'processing';

  // Helper to determine step completion
  const getStepState = (stepIndex) => {
    const statuses = ['pre_transit', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-outline-variant)] py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <Link href="/" className="font-[var(--font-family-display-lg)] text-[24px] font-extrabold tracking-tighter text-[var(--color-primary)]">
          DEMO
        </Link>
        <div className="font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-outline)]">
          Order {orderId}
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-8 md:pt-12">
        
        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-8">
            <div className="h-32 bg-gray-200 rounded-[var(--border-radius-md)]"></div>
            <div className="h-64 bg-gray-200 rounded-[var(--border-radius-md)]"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            {/* Hero Estimation Block */}
            <div className="bg-gradient-to-r from-[#111] to-[#333] text-white p-8 rounded-[var(--border-radius-md)] shadow-lg relative overflow-hidden">
              <MdOutlineLocalShipping className="absolute -right-10 -bottom-10 text-[180px] opacity-10"  />
              
              <p className="font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest text-gray-300 mb-2">Estimated Delivery</p>
              
              {currentStatus === 'delivered' ? (
                <h1 className="font-[var(--font-family-display-lg)] text-4xl md:text-5xl font-extrabold text-green-400 mb-2">Delivered!</h1>
              ) : (
                <h1 className="font-[var(--font-family-display-lg)] text-4xl md:text-5xl font-extrabold mb-2">Tomorrow</h1>
              )}
              
              <p className="font-[var(--font-family-body-md)] text-lg text-gray-200">
                {currentStatus === 'delivered' ? 'Your package has arrived.' : 'between 10:00 AM - 2:00 PM'}
              </p>
            </div>

            {/* Push Notifications Opt-In */}
            {isSupported && currentStatus !== 'delivered' && (
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-[var(--border-radius-md)] flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-blue-900">
                  <MdOutlineNotificationsActive className="text-[28px] text-blue-500" />
                  <div>
                    <h3 className="font-bold text-[14px]">Live Delivery Updates</h3>
                    <p className="text-[12px] text-blue-700">Get push notifications when your package moves.</p>
                  </div>
                </div>
                <button 
                  onClick={subscribeToPush}
                  className="w-full md:w-auto bg-blue-600 text-white font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest px-6 py-3 rounded-[var(--border-radius-sm)] hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
            )}
            
            {pushMessage && (
               <div className="text-[12px] text-green-600 font-bold text-center -mt-4">{pushMessage}</div>
            )}

            {/* Timeline UI */}
            <div className="bg-white p-8 md:p-10 rounded-[var(--border-radius-md)] border border-[var(--color-outline-variant)] shadow-sm">
              <h2 className="font-[var(--font-family-headline-md)] text-xl mb-8">Tracking History</h2>
              
              <div className="relative pl-6 border-l-2 border-gray-100 space-y-10">
                
                {/* Step 1 */}
                <div className="relative">
                  <div className={`absolute -left-[35px] w-4 h-4 rounded-full border-4 border-white ${getStepState(0) === 'completed' ? 'bg-black' : getStepState(0) === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`}></div>
                  <h3 className={`font-bold text-[15px] ${getStepState(0) !== 'pending' ? 'text-black' : 'text-gray-400'}`}>Label Created</h3>
                  <p className="text-[13px] text-[var(--color-outline)]">Processed and ready for carrier.</p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className={`absolute -left-[35px] w-4 h-4 rounded-full border-4 border-white ${getStepState(1) === 'completed' ? 'bg-black' : getStepState(1) === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`}></div>
                  <h3 className={`font-bold text-[15px] ${getStepState(1) !== 'pending' ? 'text-black' : 'text-gray-400'}`}>In Transit</h3>
                  <p className="text-[13px] text-[var(--color-outline)]">Package is on its way to the destination facility.</p>
                  
                  {/* Sub-events from EasyPost mock */}
                  {trackingData?.tracking_details?.filter(d => d.status === 'in_transit').map((detail, idx) => (
                     <div key={idx} className="mt-3 bg-[var(--color-surface-container-low)] p-3 rounded-sm border-l-2 border-gray-300">
                       <p className="text-[12px] font-bold">{detail.message}</p>
                       <p className="text-[10px] text-[var(--color-outline)]">{new Date(detail.datetime).toLocaleString()}</p>
                     </div>
                  ))}
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className={`absolute -left-[35px] w-4 h-4 rounded-full border-4 border-white ${getStepState(2) === 'completed' ? 'bg-black' : getStepState(2) === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`}></div>
                  <h3 className={`font-bold text-[15px] ${getStepState(2) !== 'pending' ? 'text-black' : 'text-gray-400'}`}>Out for Delivery</h3>
                  <p className="text-[13px] text-[var(--color-outline)]">Package is out with the local courier.</p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className={`absolute -left-[35px] w-4 h-4 rounded-full border-4 border-white ${getStepState(3) === 'completed' ? 'bg-green-500' : getStepState(3) === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-200'}`}></div>
                  <h3 className={`font-bold text-[15px] ${getStepState(3) !== 'pending' ? 'text-green-600' : 'text-gray-400'}`}>Delivered</h3>
                  <p className="text-[13px] text-[var(--color-outline)]">Package has been securely delivered.</p>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </div>
    </main>
  );
}
