'use client';

import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import Image from 'next/image';
import Link from 'next/link';
import Waitinganswer from '@/app/ui/comunes/waitinganswer';

interface Respuesta {
  id: string | undefined;
  error: string | undefined;
  status: string | undefined;
}

export default function Page() {
  
  const [ resultPayIntent, setResultPayIntent] = useState<Respuesta>({
    id: '',
    error: '',    
    status: ''
  });

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const responsePaymentIntent = await stripe?.retrievePaymentIntent(clientSecret!);      
      setResultPayIntent({
        id: responsePaymentIntent?.paymentIntent?.id,
        error: responsePaymentIntent?.error?.message,    
        status: responsePaymentIntent?.paymentIntent?.status
      });
    });
  }, [stripePromise]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacto', href: '/lc/contactos' }
        ]}
      />      
      <div className="flex justify-center items-center w-5/6 mx-auto p-4">        
        {
          !resultPayIntent.error 
            ? 
              <div id="messages" role="alert">
              {
              resultPayIntent.status ? 
              <>
                <div className="flex flex-col items-center justify-center">
                  <Image
                    width={150} 
                    height={150} 
                    alt="confirmado" 
                    src="/confirmado.png" 
                    className="h-12 w-12 rounded-full object-cover object-center mr-4" />
                  <div className="flex items-center justify-center">                        
                    <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>              
                    <p>Donacion confirmada</p>
                  </div>
                  <Link href={`https://dashboard.stripe.com/test/payments/${resultPayIntent.id}`} target="_blank" rel="noreferrer"><span className="mx-1 text-sm font-8">Ver detalles</span></Link>
                  <br/><br/>
                  <Link href="/lc/contactos">Ir a contactos</Link>
                </div>
              </> 
              : 
              <Waitinganswer/>
              }</div> 
            : 
              <div id="messages" role="alert" style={{display: 'block'}}>
              <svg className="w-4 h-4 me-2 text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>                
                {resultPayIntent.error}
              </div> 
        }
      </div>      
    </main>
  );
}