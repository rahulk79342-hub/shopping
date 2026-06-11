import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use standard supabase-js for pure client-side realtime subscriptions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export function useSupabaseTracking(orderId) {
  const [realtimeStatus, setRealtimeStatus] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log(`[Mock Realtime] Subscribed to updates for order ${orderId}`);
      // Simulate a realtime status update after 5 seconds
      const timer = setTimeout(() => {
         setRealtimeStatus('delivered');
         console.log(`[Mock Realtime] Payload received: Status is now 'delivered'`);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const channel = supabase
      .channel(`order-updates-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          console.log('Realtime update received!', payload);
          setRealtimeStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  return { realtimeStatus };
}
