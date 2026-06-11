"use server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(amount) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log("[Mock Stripe] Creating PaymentIntent for Rs.", amount);
      return { 
        clientSecret: 'pi_mock_secret_12345',
        mock: true 
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects smallest currency unit
      currency: 'inr', // Using INR as seen in the rest of the app (Rs.)
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret, mock: false };
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return { error: error.message };
  }
}

export async function createOrder(orderDetails) {
  try {
    console.log("[Mock Supabase] Saving order to database...");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be:
    // const { data, error } = await supabase.from('orders').insert(orderDetails);

    return { 
      success: true, 
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}` 
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: error.message };
  }
}
