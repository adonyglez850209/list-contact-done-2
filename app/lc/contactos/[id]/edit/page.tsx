import ContactoUpdateForm from '@/app/ui/contactos/edit-form';
import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { fetchContactoById, fetchListas } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar contacto',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [contacto, listas] = await Promise.all([
    fetchContactoById(id),
    fetchListas(),
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
            label: 'Editar contacto',
            href: `/lc/contactos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <ContactoUpdateForm contacto={contacto} listas={listas} />
    </main>
  );
}