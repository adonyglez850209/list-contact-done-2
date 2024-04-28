'use client';

import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { TypeContacto } from '@/lib/definitions';
import Image from 'next/image';

export default function DonCheckoutForm({
  contacto,
}: {
  contacto: TypeContacto;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lc/contactos/don-finish`,
      },
    });
console.log(error);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  }

  return (
    <>
    <div className="w-5/6 mx-auto p-4 bg-gray-200">
      <div className="flex flex-wrap justify-between items-center bg-gray-100 p-4">
        <div className="flex flex-col">
          <Image
            width={48} 
            height={48} 
            alt="avatar" 
            src={contacto.avatarurl} 
            className="h-12 w-12 rounded-full object-cover object-center mr-4" />
        </div>  
        <div className="flex flex-col">
            <label className="font-bold">Nombre completo</label>
            <span>{contacto.nombrecontacto}</span>
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Genero</label>
            <span>{contacto.sexo}</span>
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Edad</label>
            <span>{contacto.edad}</span>
        </div>
        <div className="flex flex-col">
            <label className="font-bold">Correo</label>
            <span>{contacto.correo}</span>
        </div>  
        <div className="flex flex-col">
            <label className="font-bold">Fecha de registro</label>
            <span>{formatDateToLocal(contacto.fecha.toDateString())}</span>
        </div>
      </div> 
    </div>    
    <div className="w-5/6 mx-auto p-4 bg-gray-200">
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
          />
        <PaymentElement id="payment-element" /><br/>
        <div className="flex flex-col items-center justify-center">
          <button disabled={isLoading || !stripe || !elements} id="submit" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">        
            {isLoading ? 
            <>
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              Procesando...        
            </> : 
            <>Donar {formatCurrency(contacto.cuota * 100)}</> 
            }                 
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message" className="flex items-center justify-center">
            <svg className="w-4 h-4 me-2 text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <p>{message}</p>
          </div>}
        </div>
      </form>
    </div>
    </>
  )
}