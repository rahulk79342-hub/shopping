import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock';

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;

    // Verify Stripe signature securely if we have real keys
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error(`Webhook signature verification failed:`, err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
      }
    } else {
      // Mock parsing for local development without live keys
      event = JSON.parse(body);
      console.log("[Mock Webhook] Received unverified event:", event.type);
    }

    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`[Webhook] PaymentIntent for ${paymentIntent.amount} was successful!`);
        // TODO: Update Supabase order status to PAID
        // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        // await supabase.from('orders').update({ status: 'PAID' }).eq('stripe_pi_id', paymentIntent.id);
        break;
        
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log(`[Webhook] PaymentMethod ${paymentMethod.id} was attached to a customer.`);
        break;
        
      // ... handle other event types
      default:
        console.log(`[Webhook] Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
