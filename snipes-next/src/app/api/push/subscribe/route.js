import { NextResponse } from 'next/server';
import webpush from 'web-push';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(
    'mailto:test@example.com',
    publicVapidKey,
    privateVapidKey
  );
}

export async function POST(req) {
  try {
    const subscription = await req.json();

    if (!publicVapidKey || !privateVapidKey) {
      console.log(`[Mock Web Push] Received subscription object, but missing VAPID keys. Mocking success.`);
      return NextResponse.json({ success: true, mock: true }, { status: 201 });
    }

    // In a real app, save 'subscription' to Supabase for this user
    // await supabase.from('push_subscriptions').insert({ user_id: '...', subscription })

    // Test notification immediately
    const payload = JSON.stringify({
      title: 'Snipes Menswear',
      body: 'Push notifications are now enabled!',
      url: '/'
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true, mock: false }, { status: 201 });
  } catch (error) {
    console.error('Push Subscription Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
