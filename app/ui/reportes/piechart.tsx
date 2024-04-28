'use client';

import { valueFormatter } from '@/lib/utils';
import { DonutChart, Legend } from '@tremor/react'
import { lusitana } from '@/app/fonts';

export default function ChartPie({ elemento }: { elemento: any[] }) {  

  return (
    <>
      <div className="flex items-center justify-center space-x-6">
      <span className={`${lusitana.className} text-sm font-12`}>
      Total
      </span>        
        <DonutChart
          data={elemento}
          category="valor"
          index="label"
          valueFormatter={valueFormatter}
          colors={['blue', 'green']}
          className="w-40"
        />
        <Legend
          categories={['Pending', 'Paid']}
          colors={['blue', 'green']}
          className="max-w-xs"
        />
      </div>
    </>
  );
}

/*
import {
    TypeReporteEstadoCuotav1,
} from '@/lib//definitions';
import { DonutChart, Card } from '@tremor/react'

export default function ChartPie({ elemento }: { elemento: TypeReporteEstadoCuotav1 }) {

  const data = [
    {
      Weather: 'Sunny',
      Classmates: 10,
    },
    {
      Weather: 'Winner',
      Classmates: 30,
    },    
  ]

  return (
    <div className="my-10">
      <p>gggg</p>
      <Card>
        <DonutChart
          data={data}
          index="Weather"
          category="Classmates"
          variant="pie"
        />
      </Card>
    </div>  
  );
}*/

