import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16',
});

// Stripe requires the raw body to construct the event
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // If we have a webhook secret, verify the signature
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      // Mock mode: parse JSON directly
      event = JSON.parse(payload);
      console.log("[Mock Stripe Webhook] Processing event without signature verification.");
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`[Stripe Webhook] PaymentIntent for ${paymentIntent.amount} was successful!`);
      
      // MOCK: Update Supabase order status
      // const orderId = paymentIntent.metadata.orderId;
      // await supabase.from('orders').update({ status: 'paid' }).eq('id', orderId);
      console.log(`[Mock Supabase] Order status updated to PAID.`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}
