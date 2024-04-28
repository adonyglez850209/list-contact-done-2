'use client';

import { TypeLista, TypeContacto } from '@/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  DocumentTextIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/comunes/button';
import { UploadButton } from "@/lib/uploadthing";
import { ContactoActionUpdate } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function ContactoUpdateForm({
  contacto,
  listas,
}: {
  contacto: TypeContacto;
  listas: TypeLista[];
}) {
  const initialState = { message: '', errors: {} };
  const updateContactoWithId = ContactoActionUpdate.bind(null, contacto.id);
  const [state, dispatch] = useFormState(updateContactoWithId, initialState);

  const [avatarurl, setAvatarurl] = useState(contacto.avatarurl);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre lista */}
        <div className="mb-4">
          <label htmlFor="slista" className="mb-2 block text-sm font-medium">
            Tipo
          </label>
          <div className="relative">
            <select
              id="slista"
              name="slistaId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={contacto.listaId}
            >
              <option value="" disabled>
                Selecciona el tipo
              </option>
              {listas.map((lista) => (
                <option key={lista.id} value={lista.id}>
                  {lista.nombrelista}
                </option>
              ))}
            </select>
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />            
          </div>
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombrecontacto" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombrecontacto"
                name="nombrecontacto"
                type="text"
                defaultValue={contacto.nombrecontacto}
                placeholder="Escriba el nombre"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="mb-2 block text-sm font-medium">
            Correo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="correo"
                name="correo"
                type="text"
                defaultValue={contacto.correo}
                placeholder="Escriba el correo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Genero */}
        <div className="mb-4">
          <label htmlFor="sexo" className="mb-2 block text-sm font-medium">
            Genero
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="sexo"
                name="sexo"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={contacto.sexo}
              >
              <option value="" disabled>
                Selecciona el sexo
              </option>                
                <option key="f" value="f">f</option>
                <option key="m" value="m">m</option>
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Edad */}
        <div className="mb-4">
          <label htmlFor="edad" className="mb-2 block text-sm font-medium">
            Edad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="edad"
                name="edad"
                type="number"
                defaultValue={contacto.edad}
                placeholder="Escriba la edad"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div> 

        {/* Cuota contacto */}
        <div className="mb-4">
          <label htmlFor="cuota" className="mb-2 block text-sm font-medium">
            Donacion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cuota"
                name="cuota"
                type="number"
                step="0.01"
                defaultValue={contacto.cuota}
                placeholder="Escriba la cuota (USD)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Couta status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
          Estado de la donacion
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  defaultValue="pending"
                  defaultChecked={contacto.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  defaultValue="paid"
                  defaultChecked={contacto.status === 'paid'}                  
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Aavatar URL */}
        <div className="mb-4">
          <label htmlFor="cuota" className="mb-2 block text-sm font-medium">
            Avatar
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="avatarurl"
                name="avatarurl"
                defaultValue={avatarurl}
                type="hidden"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div className="relative">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                setAvatarurl(res[0].url);
                // Do something with the response
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />              
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
          href="/lc/contactos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar contacto</Button>
      </div>
    </form>
  );
}
