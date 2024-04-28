import ListaCreateForm from '@/app/ui/listas/create-form';
import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear tipo',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tipo', href: '/lc/listas' },
          {
            label: 'Crear tipo',
            href: '/lc/listas/create',
            active: true,
          },
        ]}
      />
      <ListaCreateForm />
    </main>
  );
}