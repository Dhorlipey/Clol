import Stripe from 'stripe';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
dotenv.config();



export async function POST(req: any) {

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });
    let data = JSON.parse(req.body);

    // Create Checkout Sessions from body params.

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: req.body.map((item: Product) => {
        const img = item.image

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: img,
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.amount
        }
      }),
      success_url: `${req.headers.origin}/successPay`,
      cancel_url: `${req.headers.origin}/canceled`,
    })

    return NextResponse.json(session);

  } catch (err: any) {
    return NextResponse.json(err.message);
  }

}