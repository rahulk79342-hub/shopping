import { NextResponse } from 'next/server';
import EasyPostClient from '@easypost/api';

// Initialize SDK with fallback
const client = process.env.EASYPOST_API_KEY 
  ? new EasyPostClient(process.env.EASYPOST_API_KEY)
  : null;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingCode = searchParams.get('code');

    if (!trackingCode) {
      return NextResponse.json({ error: 'Tracking code required' }, { status: 400 });
    }

    // --- MOCK MODE ---
    if (!client) {
      console.log(`[Mock EasyPost] Fetching tracking for ${trackingCode}`);
      
      // Simulate network delay
      // Removed simulated network latency

      const mockData = {
        tracking_code: trackingCode,
        status: 'out_for_delivery',
        est_delivery_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        carrier: 'FedEx',
        tracking_details: [
          { status: 'pre_transit', message: 'Label Created', datetime: new Date(Date.now() - 3 * 86400000).toISOString() },
          { status: 'in_transit', message: 'Arrived at Sort Facility', datetime: new Date(Date.now() - 2 * 86400000).toISOString() },
          { status: 'in_transit', message: 'Departed Sort Facility', datetime: new Date(Date.now() - 1 * 86400000).toISOString() },
          { status: 'out_for_delivery', message: 'Out for Delivery', datetime: new Date().toISOString() }
        ]
      };

      return NextResponse.json({ success: true, tracking: mockData, mock: true }, { status: 200 });
    }

    // --- LIVE EASYPOST ---
    const tracker = await client.Tracker.retrieve(trackingCode);
    return NextResponse.json({ success: true, tracking: tracker, mock: false }, { status: 200 });

  } catch (error) {
    console.error('Tracking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
