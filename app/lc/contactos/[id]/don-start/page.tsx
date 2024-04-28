import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { fetchContactoById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DonPaymentForm from '@/app/ui/contactos/don-payment-form';

export const metadata: Metadata = {
  title: 'Efectuar donacion',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [contacto] = await Promise.all([    
    fetchContactoById(id),
  ]);

  if (!contacto) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacto', href: '/lc/contactos' },
          {
            label: 'Efectuar donacion',
            href: `/lc/contactos/${id}/don-start`,
            active: true,
          },          
        ]}
      />
      <DonPaymentForm contacto={contacto}/>
    </main>
  );
}