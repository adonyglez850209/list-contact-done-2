import ListaUpdateForm from '@/app/ui/listas/edit-form';
import Breadcrumbs from '@/app/ui/comunes/breadcrumbs';
import { fetchListaById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar tipo',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [lista] = await Promise.all([
    fetchListaById(id)
  ]);

  if (!lista) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tipo', href: '/lc/listas' },
          {
            label: 'Editar tipo',
            href: `/lc/listas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <ListaUpdateForm lista={lista} />
    </main>
  );
}