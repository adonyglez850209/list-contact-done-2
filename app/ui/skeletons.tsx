const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ListasTableRowSkeleton() {
    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Nombre */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-32 rounded bg-gray-100"></div>
                </div>
            </td>
            {/* Actions */}
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                </div>
            </td>
        </tr>
    );
}

export function ListasMobileSkeleton() {
    return (
        <div className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                </div>
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
                <div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
                </div>
                <div className="flex justify-end gap-2">
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                </div>
            </div>
        </div>
    );
}

export function ListasTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        <ListasMobileSkeleton />
                        <ListasMobileSkeleton />
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Nombre
                            </th>
                            <th
                                scope="col"
                                className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        <ListasTableRowSkeleton />
                        <ListasTableRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export function ContactosTableRowSkeleton() {
    return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        {/* Nombre e imagen del contacto */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-24 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Correo */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Correo */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Sexo */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>            
        {/* Fecha */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Cuota */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>      
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          </div>
        </td>
      </tr>
    );
}

export function ContactosMobileSkeleton() {
    return (
      <div className="mb-2 w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
          </div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="flex w-full items-center justify-between pt-4">
          <div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
            <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-10 w-10 rounded bg-gray-100"></div>
            <div className="h-10 w-10 rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
}

export function ContactosTableSkeleton() {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
              <ContactosMobileSkeleton />
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
                <ContactosTableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}