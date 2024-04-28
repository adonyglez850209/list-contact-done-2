'use client';

import { TypeLista } from '@/lib/definitions';
import Link from 'next/link';
import {
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/comunes/button';
import { ListaActionUpdate } from '@/lib/actions';
import { useFormState } from 'react-dom';

export default function ListaUpdateForm({
  lista
}: {
  lista: TypeLista
}) {
  const initialState = { message: '', errors: {} };
  const updateListaWithId = ListaActionUpdate.bind(null, lista.id);
  const [state, dispatch] = useFormState(updateListaWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombrelista" className="mb-2 block text-sm font-medium">
            Nombre:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombrelista"
                name="nombrelista"
                type="text"
                placeholder="Escriba el nombre"
                defaultValue={lista.nombrelista}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/lc/listas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar tipo</Button>
      </div>
    </form>
  );
}
