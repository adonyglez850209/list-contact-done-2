import { fetchListas } from '@/lib/data';
import ContactoCreateForm from '@/app/ui/contactos/create-form';
import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear contacto',
};

export default async function Page() {
  const listas = await fetchListas();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contacto', href: '/lc/contactos' },
          {
            label: 'Crear contacto',
            href: '/lc/contactos/create',
            active: true,
          },
        ]}
      />
      <ContactoCreateForm listas={listas} />
    </main>
  );
}