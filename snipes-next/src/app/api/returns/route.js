import { NextResponse } from 'next/server';
import EasyPostClient from '@easypost/api';
import { createClient } from '@supabase/supabase-js';

// Initialize real clients
const easyPost = process.env.EASYPOST_API_KEY ? new EasyPostClient(process.env.EASYPOST_API_KEY) : null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, email, resolution, reason, photoUrl, item } = body;

    if (!orderId || !email || !item) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Generate EasyPost Return Label (Real implementation)
    let labelUrl = '';
    let trackingCode = '';

    if (easyPost) {
      try {
        // Create addresses (Mock warehouse and mock customer)
        const toAddress = await easyPost.Address.create({
          verify: ['delivery'],
          street1: '417 Montgomery Street',
          street2: '5th Floor',
          city: 'San Francisco',
          state: 'CA',
          zip: '94104',
          country: 'US',
          company: 'Snipes Returns',
          phone: '4151234567'
        });

        const fromAddress = await easyPost.Address.create({
          verify: ['delivery'],
          name: 'Customer Returns',
          street1: '118 2nd Street',
          street2: '4th Floor',
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
          country: 'US',
          phone: '4159876543'
        });

        // Create Parcel
        const parcel = await easyPost.Parcel.create({
          length: 9,
          width: 6,
          height: 2,
          weight: 10
        });

        // Create Shipment
        const shipment = await easyPost.Shipment.create({
          to_address: toAddress,
          from_address: fromAddress,
          parcel: parcel,
          options: { print_custom_1: `Return for Order: ${orderId}` }
        });

        // Buy Shipment with lowest rate
        const boughtShipment = await easyPost.Shipment.buy(shipment.id, shipment.lowestRate());
        
        // Extract label details
        labelUrl = boughtShipment.postage_label.label_url;
        trackingCode = boughtShipment.tracking_code;

      } catch (epError) {
        console.error("EasyPost Error:", epError);
        return NextResponse.json({ error: 'Failed to generate return label via EasyPost' }, { status: 502 });
      }
    } else {
      console.log("[Production Warning] EasyPost key missing. Backend aborting label generation.");
      return NextResponse.json({ error: 'EASYPOST_API_KEY missing in environment.' }, { status: 500 });
    }

    // 2. Save Return Request to Supabase Database
    let returnRecordId = `RET-${Date.now()}`;
    
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('order_returns')
          .insert([
            {
              order_id: orderId,
              customer_email: email,
              item_details: item,
              reason: reason,
              resolution: resolution, // 'credit' or 'exchange'
              photo_url: photoUrl,
              tracking_code: trackingCode,
              label_url: labelUrl,
              status: 'pending'
            }
          ])
          .select();

        if (error) throw error;
        if (data && data.length > 0) returnRecordId = data[0].id;

      } catch (dbError) {
        console.error("Supabase Database Error:", dbError);
        // We do not fail the whole request if DB insert fails in this case, 
        // because the label was already purchased, but ideally we'd handle transactions.
      }
    } else {
       console.log("[Production Warning] Supabase keys missing. Backend aborting DB insert.");
       return NextResponse.json({ error: 'Supabase keys missing in environment.' }, { status: 500 });
    }

    // 3. Return Success to Client
    return NextResponse.json({ 
      success: true, 
      returnId: returnRecordId,
      labelUrl: labelUrl,
      trackingCode: trackingCode
    }, { status: 200 });

  } catch (error) {
    console.error('Returns API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
