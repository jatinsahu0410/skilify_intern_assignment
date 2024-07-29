import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    const { orderID } = await req.json();

    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`).toString('base64');

    try {
        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error capturing PayPal order:', error);
        return NextResponse.json({ error: 'Error capturing PayPal order' }, { status: 500 });
    }
}
