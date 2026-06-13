"use server";

import Stripe from 'stripe';

// Initialize Stripe with the secret key (or a mock key if undefined)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16',
});

/**
 * Creates a Stripe Payment Intent securely on the server.
 * @param {number} amount - The amount to charge (in base currency, e.g., INR).
 * @returns {object} - The clientSecret for the PaymentElement or a mock string.
 */
export async function createPaymentIntent(amount) {
  try {
    // Fallback if no real key is present
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log("[Mock Stripe] Creating mock PaymentIntent for amount:", amount);
      return { clientSecret: 'pi_3MockPaymentIntentID_secret_MockClientSecret123456789' };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return { error: error.message };
  }
}

/**
 * Creates an order in the database after successful payment confirmation.
 * @param {object} orderData - The validated order information.
 * @returns {object} - Success status and generated orderId.
 */
export async function createOrder(orderData) {
  try {
    const { email, address, items, total, mode, paymentMethod = 'stripe' } = orderData;
    
    // 1. Validate data securely on the server
    if (!email || !address || !items || items.length === 0) {
      throw new Error("Missing required order data");
    }

    // 2. Generate a unique Order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Mutate database (Mocking Supabase mutation for the demo)
    console.log(`[Database Mutation] Creating ${mode} order ${orderId} via ${paymentMethod} for ${email}`);
    
    // In a real app with Supabase:
    // const supabase = createServerActionClient({ cookies });
    // const { error } = await supabase.from('orders').insert({
    //   id: orderId,
    //   email,
    //   shipping_address: address,
    //   total_amount: total,
    //   status: 'PROCESSING'
    // });
    
    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: error.message };
  }
}
