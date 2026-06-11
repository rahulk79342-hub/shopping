import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a dummy key to prevent crashes if NEXT_PUBLIC_RESEND_API_KEY is missing
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || 're_mock123456789');

export async function POST(request) {
  try {
    const { email, productId, productName } = await request.json();

    if (!email || !productId) {
      return NextResponse.json({ error: 'Email and Product ID are required' }, { status: 400 });
    }

    // Mock response if using the dummy key or no key
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      console.log(`[Mock Resend] Registered ${email} for restock alerts on ${productName || productId}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      return NextResponse.json({ 
        success: true, 
        message: 'Mock email alert registered successfully.' 
      }, { status: 200 });
    }

    // Real Resend Logic (when API key is provided)
    const data = await resend.emails.send({
      from: 'Snipes Menswear <noreply@snipes.com>', // Replace with your verified domain
      to: [email],
      subject: `You're on the list for: ${productName}`,
      html: `
        <div>
          <h2>Restock Alert Registered</h2>
          <p>Hi there,</p>
          <p>You're officially on the waitlist for the <strong>${productName}</strong>.</p>
          <p>We'll send you an email the minute it becomes available again!</p>
          <br/>
          <p>Best,<br/>The Snipes Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error in notify-restock:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
