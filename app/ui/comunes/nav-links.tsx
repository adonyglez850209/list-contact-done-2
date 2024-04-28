'use client';

import {
  UserGroupIcon,
  DocumentTextIcon,
  UserCircleIcon,
  DocumentDuplicateIcon,
  DocumentChartBarIcon,
  ArrowRightIcon,
  LockClosedIcon,  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/lib/definitions';

const menuItemsOut: MenuItem[] = [
  {
    title: "Resumen",
    route: "/",
    icono: DocumentTextIcon
  },
  {
    title: "Entrar",
    route: "/login",
    icono: LockClosedIcon
  },
  {
    title: "Registrarse",
    route: "/register",
    icono: ArrowRightIcon
  }
];

const menuItemsIn: MenuItem[] = [
  {
    title: "Resumen",
    route: "/",
    icono: DocumentTextIcon
  },
  {
    title: "Candidatos",
    route: "/lc",
    icono: UserCircleIcon
  },
  {
    title: "Contactos",
    route: "/lc/contactos",
    icono: UserGroupIcon
  },
  {
    title: "Tipos",
    route: "/lc/listas",
    icono: DocumentDuplicateIcon
  },
  {
    title: "Reportes",
    icono:DocumentChartBarIcon,
    children: [
      {
        title: "Total",
        route: "/lc/reportes",
        icono: DocumentChartBarIcon
      },
      {
        title: "x tipo",
        route: "/lc/reportes/estadocuotatipo",
        icono: DocumentChartBarIcon        
      },
      {
        title: "x genero",
        route: "/lc/reportes/estadocuotagenero",
        icono: DocumentChartBarIcon        
      },
    ],
  }  
];

export default function NavLinks({ islogin, notmobile }: { islogin: boolean, notmobile: boolean }) {

  const pathname = usePathname();
  const links = islogin ? menuItemsIn : menuItemsOut;
  return (
    <ul className="menu menu-horizontal px-1">
      {
      links.map((link) => {
        const LinkIcon = link.icono;
        return link.hasOwnProperty("children") ? (
          <li key={link.title}>
            <details>
            <summary>{link.title}</summary>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52" key={link.title}>
              {
                  link.children?.map(item =>
                    <li key={item.title}>
                      <Link
                        key={item.title}
                        href={item?.route || ""}
                      >
                        {notmobile && <LinkIcon className="w-6" />}
                        <p>{item.title}</p>
                      </Link>
                    </li>
                  )                
              }
            </ul>
            </details>
          </li>
        ) : (
          <li key={link.title}>
            <Link
              key={link.title}
              href={link?.route || ""}
            >
              {notmobile && <LinkIcon className="w-6" />}
              <p>{link.title}</p>
            </Link>            
          </li>         
        );        
      })
      }  
    </ul>
  );
}