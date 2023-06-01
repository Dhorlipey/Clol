import Stripe from 'stripe';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
dotenv.config();



export async function POST(req: any) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });


    // Create Checkout Sessions from body params.

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [
        {
          price: 'price_1L93r2BwKXiCGVaLv1gNOElA',
          quantity: 1
        }
      ],
      success_url: `${req.headers.origin}/successPay`,
      cancel_url: `${req.headers.origin}/canceled`,
    })

    return NextResponse.json(session);

  } catch (err: any) {
    return NextResponse.json(err.message);
  }

}