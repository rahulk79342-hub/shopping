import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import twilio from 'twilio';

// Initialize SDKs with fallbacks
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock123');

const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
  : null;

export async function POST(request) {
  try {
    const { orderId, email, phone, items, total, address } = await request.json();

    if (!orderId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const results = { email: false, sms: false, mock: false };

    // --- 1. MOCK MODE (No real API keys) ---
    if (!process.env.RESEND_API_KEY) {
      console.log(`\n--- [MOCK NOTIFICATIONS] ---`);
      console.log(`📧 MOCK EMAIL sent to: ${email}`);
      console.log(`📱 MOCK SMS sent to: ${phone || 'No phone provided'}`);
      console.log(`Order: ${orderId} | Total: Rs. ${total}`);
      console.log(`----------------------------\n`);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Mock notifications sent successfully.',
        results: { email: true, sms: true, mock: true } 
      }, { status: 200 });
    }

    // --- 2. LIVE RESEND EMAIL ---
    try {
      await resend.emails.send({
        from: 'Snipes Menswear <orders@snipes.com>', // Replace with your verified domain
        to: [email],
        subject: `Order Confirmation: ${orderId}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #111;">Order Confirmed!</h1>
            <p>Thank you for shopping at Snipes Menswear. Your order <strong>${orderId}</strong> has been received.</p>
            <h3>Shipping To:</h3>
            <p>${address}</p>
            <h3>Order Summary:</h3>
            <ul>
              ${items.map(item => `<li>${item.quantity}x ${item.name} (${item.size}) - Rs. ${item.price * item.quantity}</li>`).join('')}
            </ul>
            <h2 style="border-top: 1px solid #eee; padding-top: 10px;">Total: Rs. ${total}.00</h2>
            <br/>
            <a href="https://snipes.com/track/${orderId}" style="background: #111; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">Track Order</a>
          </div>
        `,
      });
      results.email = true;
    } catch (emailErr) {
      console.error('Resend Error:', emailErr);
    }

    // --- 3. LIVE TWILIO SMS ---
    if (twilioClient && phone && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: `Snipes Menswear: Order ${orderId} confirmed! Track your package here: https://snipes.com/track/${orderId}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
        results.sms = true;
      } catch (smsErr) {
        console.error('Twilio Error:', smsErr);
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error('Notification API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
