import { fetchReporteContactosEstadoCuotaGroupByTipo } from '@/lib/data';
import ReporteContactosEstadoCuotaTipo from '@/app/ui/reportes/contactosestadocuotatipo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Por contacto',
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
  
    const elementos = await fetchReporteContactosEstadoCuotaGroupByTipo(query);
  
    return (
      <main>
        <ReporteContactosEstadoCuotaTipo elementos={elementos} />
      </main>
    );
  }
