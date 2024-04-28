import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(body.cuota) * 100,
      currency: "USD",
      metadata: {
        donante_id: body.id,
      },      
    });

    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}