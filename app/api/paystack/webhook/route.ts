import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { contributions } from '@/lib/db/schema';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Verify signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const data = event.data;
      const metadata = data.metadata;
      
      if (!metadata?.memberId || !metadata?.cooperativeId) {
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      // Record contribution in Neon DB
      await db.insert(contributions).values({
        cooperativeId: metadata.cooperativeId,
        memberId: metadata.memberId,
        amount: String(data.amount / 100), // Convert back from kobo
        status: 'Confirmed',
        receiptId: data.reference,
        date: new Date(data.paid_at),
      });

      return NextResponse.json({ status: 'success' });
    }

    // Return 200 for unhandled events to acknowledge receipt
    return NextResponse.json({ status: 'ignored' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
