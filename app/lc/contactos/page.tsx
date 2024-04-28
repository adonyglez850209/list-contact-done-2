import Pagination from '@/app/ui/comunes/pagination';
import Search from '@/app/ui/comunes/search';
import ContactosTable from '@/app/ui/contactos/table';
import { ButtonCreateContacto } from '@/app/ui/contactos/buttons';
import { lusitana } from '@/app/fonts';
import { ContactosTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchContactosTotalPaginas } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contactos',
};

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
  
    const totalPages = await fetchContactosTotalPaginas(query);
  
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <span className={`${lusitana.className} text-sm font-8`}>Contactos</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar contactos..." />
          <ButtonCreateContacto />
        </div>
        <Suspense key={query + currentPage} fallback={<ContactosTableSkeleton />}>
          <ContactosTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
}
