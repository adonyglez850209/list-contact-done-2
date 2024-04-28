import Pagination from '@/app/ui/comunes/pagination';
import ListasTable from '@/app/ui/listas/table';
import { ButtonCreateLista } from '@/app/ui/listas/buttons';
import { lusitana } from '@/app/fonts';
import { ListasTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchListasTotalPaginas } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tipos',
};

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  }) {
    const currentPage = Number(searchParams?.page) || 1;
  
    const totalPages = await fetchListasTotalPaginas();
  
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <span className={`${lusitana.className} text-sm font-8`}>Tipos</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <ButtonCreateLista />
        </div>
        <Suspense key={currentPage} fallback={<ListasTableSkeleton />}>
          <ListasTable currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
}
