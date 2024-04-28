import { fetchReporteContactosEstadoCuotaGroupByGenero } from '@/lib/data';
import ReporteContactosEstadoCuotaGenero from '@/app/ui/reportes/contactosestadocuotagenero';
import { lusitana } from '@/app/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Por genero',
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
  
    const elementos = await fetchReporteContactosEstadoCuotaGroupByGenero(query);
  
    return (
      <ReporteContactosEstadoCuotaGenero elementos={elementos} />      
    );
  }