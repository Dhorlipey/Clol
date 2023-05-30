import Stripe from 'stripe';
import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
dotenv.config();



export async function POST(req: NextApiRequest, res: NextApiResponse) {

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15', // Specify the desired Stripe API version
    });

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

    res.json(session.url);

  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }

}