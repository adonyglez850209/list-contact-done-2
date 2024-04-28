import ChartPie from '@/app/ui/reportes/piechart';
import { fetchReporteContactosEstadoCuota } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reporte',
};

export default async function Page() {
    const elemento = await fetchReporteContactosEstadoCuota();
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ChartPie elemento={elemento}/>       
      </div>      
    );
}  