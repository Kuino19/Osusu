import { NextResponse } from 'next/server';
import { getCurrentMember } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const currentMember = await getCurrentMember();
    if (!currentMember) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, email, purpose } = await req.json();

    if (!amount || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert amount to kobo (Paystack expects smallest currency unit)
    const amountInKobo = Math.round(Number(amount) * 100);

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        metadata: {
          memberId: currentMember.id,
          cooperativeId: currentMember.cooperativeId,
          purpose: purpose || 'Contribution',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack Error:', data);
      return NextResponse.json({ error: data.message || 'Payment initialization failed' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Init Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
