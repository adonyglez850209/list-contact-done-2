"use client";

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { TypeContacto } from '@/lib/definitions';
import DonCheckoutForm from "@/app/ui/contactos/don-checkout-form";
import Waitinganswer from '@/app/ui/comunes/waitinganswer';
import NotFound from '@/app/ui/comunes/not-found';

export default function DonPaymentForm({
  contacto,
}: {
  contacto: TypeContacto;
}) {
  
  const [ clientSecret, setClientSecret ] = useState('');
  const [ estado, setEstado ] = useState(0);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/paymentintents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto)
      })
      .then(response => {
        if (!response.ok) {
           throw new Error('Error: ' + response.status);
        }
        return response.json();
       })
       .then(data => {        
        setClientSecret(data);
        setEstado(1);        
       })
       .catch(() => {
        setEstado(2);
       });
  }, [contacto]);

  return (
    <>
      {
        estado === 0 ?        
        <Waitinganswer/>
        : estado === 1 ?
        <>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <DonCheckoutForm contacto={contacto}/>
          </Elements>
          )
        }        
        </>
        :
        <NotFound/>
      }      
    </>
  );
}