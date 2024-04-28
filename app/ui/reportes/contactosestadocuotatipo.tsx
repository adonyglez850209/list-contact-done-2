import { lusitana } from '@/app/fonts';
import Search from '@/app/ui/comunes/search';
import {
  TypeReporteEstadoCuotaGroupByTipo,
} from '@/lib/definitions';

export default async function ReporteContactosEstadoCuotaTipo({
  elementos,
}: {
  elementos: TypeReporteEstadoCuotaGroupByTipo[];
}) {
  return (
    <div className="w-full">
      <span className={`${lusitana.className} text-sm font-12`}>
      Por tipo de contacto
      </span>
      <Search placeholder="Buscar tipo de contactos..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {elementos?.map((elemento) => (
                  <div
                    key={elemento.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex w-full items-center justify-between border-b py-5">
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs">Nombre</p>
                          <p className="font-medium">{elemento.nombrelista}</p>
                        </div>
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs">Cantidad</p>
                          <p className="font-medium">{elemento.cantidad}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{elemento.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{elemento.total_paid}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total</p>
                        <p className="font-medium">{elemento.total}</p>
                      </div>                      
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Cantidad
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Paid
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {elementos.map((elemento) => (
                    <tr key={elemento.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{elemento.nombrelista}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {elemento.cantidad}
                      </td>                      
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {elemento.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">                        
                        {elemento.total_paid}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {elemento.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
