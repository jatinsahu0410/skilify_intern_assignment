import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    const { amount } = await req.json();

    const finalAmount = amount.toFixed(2);
    const orderAmount = finalAmount.toString();
    // console.log(typeof(orderAmount))
    console.log("The final Amount :", finalAmount);

    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`).toString('base64');

    try {
        const response = await axios.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: orderAmount,
                    },
                }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        return NextResponse.json({ error: 'Error creating PayPal order' }, { status: 500 });
    }
}
