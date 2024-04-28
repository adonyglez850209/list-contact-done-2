import Image from 'next/image';
import { ButtonUpdateContacto, ButtonDeleteContacto } from '@/app/ui/contactos/buttons';
import CheckBoxContactoStatus from '@/app/ui/contactos/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchContactosTable } from '@/lib/data';

export default async function TableContactos({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const contactos = await fetchContactosTable(query, currentPage);

  return (
    <>       
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {contactos?.map((contacto) => (
              <div
                key={contacto.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={contacto.avatarurl}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${contacto.nombrecontacto}'s profile picture`}
                      />
                      <p>{contacto.nombrecontacto}</p>
                    </div>
                    <p className="text-sm text-gray-500">{contacto.sexo}</p>
                    <p className="text-sm text-gray-500">{contacto.edad}</p>
                    <p className="text-sm text-gray-500">{contacto.correo}</p>
                  </div>
                  <CheckBoxContactoStatus contacto={contacto} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(contacto.cuota)}
                    </p>
                    <p>{formatDateToLocal(contacto.fecha.toDateString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">                  
                    <ButtonUpdateContacto id={contacto.id} />
                    <ButtonDeleteContacto id={contacto.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Genero
                </th>   
                <th scope="col" className="px-3 py-5 font-medium">
                  Edad
                </th>   
                <th scope="col" className="px-3 py-5 font-medium">
                  Correo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>                
                <th scope="col" className="px-3 py-5 font-medium">
                  Donacion
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado de la donacion
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contactos?.map((contacto) => (
                <tr
                  key={contacto.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={contacto.avatarurl}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${contacto.nombrecontacto}'s profile picture`}
                      />
                      <p>{contacto.nombrecontacto}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contacto.sexo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contacto.edad}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contacto.correo}
                  </td>                                                      
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(contacto.fecha.toDateString())}
                  </td>                  
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(contacto.cuota)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CheckBoxContactoStatus contacto={contacto} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ButtonUpdateContacto id={contacto.id} />
                      <ButtonDeleteContacto id={contacto.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
