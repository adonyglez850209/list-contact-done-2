import Stripe from "stripe";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";
import { ContactoActionUpdateStatus } from '@/lib/actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhooksecret: string = process.env.STRIPE_WEBHOOK_SECRET_KEY_PAYMENT_INTENT!;

export async function POST(req: Request) {

  const body = await req.text();

  const headersList = headers();
  const firma = headersList.get('stripe-signature') || '';

  let event;

  try {
      event = stripe.webhooks.constructEvent(body, firma, webhooksecret);
      
      if (event.type === 'payment_intent.succeeded') {
        const stripeObject: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
  
        // actualizar en base de dato el estado del contacto
        const contact_id = stripeObject.metadata.donante_id
        try {
          await ContactoActionUpdateStatus(contact_id, "paid");
        } catch (error: any) {
          console.log(`❌ Error message update database: ${error.message}`);
        }        
  
        console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
      } 
      else if (event.type === 'charge.succeeded') {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);
      } 
      else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }
  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400});
  }
  
  return new NextResponse(null, { status:200 });
}