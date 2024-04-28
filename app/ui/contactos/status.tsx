import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { TypeContacto } from '@/lib/definitions';

export default function CheckBoxContactoStatus({ contacto }: { contacto: TypeContacto }) {

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': contacto.status === 'pending',
          'bg-green-500 text-white': contacto.status === 'paid',
        },
      )}
    >
      {
        contacto.status === 'pending' ? (
        <Link
            key={contacto.id}
            href={`/lc/contactos/${contacto.id}/don-start`}
        >
          <div className="flex items-center">
              <p>Pending</p>
              <ClockIcon className="ml-1 w-4 text-gray-500" />
          </div>
        </Link>
        ) : null        
      }
      {
        contacto.status === 'paid' ? (
          <>
            Paid
            <CheckIcon className="ml-1 w-4 text-white" />
          </>
        ) : null        
      }
    </span>
  );
}
