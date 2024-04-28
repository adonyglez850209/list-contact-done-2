import {
    TypeLista,
    TypeContacto,
    TypeReporteEstadoCuotav0,
    TypeReporteEstadoCuotaGroupByTipo,
    TypeReporteEstadoCuotaGroupByGenero
} from '@/lib/definitions';
import {
    formatCurrency,
    updateAttribute,    
} from '@/lib/utils';
import { PrismaClient } from '@prisma/client'

const ITEMS_PER_PAGE = 5;

const prisma = new PrismaClient()

//-------------------------------------------------------------------------------------

export async function fetchListas() {
  try {
    const results: TypeLista[] = await prisma.lista.findMany({
        orderBy: {
            nombrelista: 'asc',
        },
    });
    return results;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch tipo.');
  }
}

export async function fetchListasTable(
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const results: TypeLista[] = await prisma.lista.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            orderBy: {
                nombrelista: 'asc',
            },
        });
        return results;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch tipo.');
    }
}

export async function fetchListasTotalPaginas() {
    try {
        const count = await prisma.lista.count();
        return Math.ceil(Number(count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total de paginas de tipo.');
    }
}

export async function fetchListaById(id: string) {
    try {
        // Returns an object or null
        const lista: TypeLista | null = await prisma.lista.findUnique({
            where: {
                id: id,
            },
        });
        return lista;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch tipo.');
    }
}

//-------------------------------------------------------------------------------------

export async function fetchContactosTable(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
      const results: TypeContacto[] = await prisma.contacto.findMany({
        where: {
            OR: [
              { nombrecontacto: { contains: query, } },
              { correo: { contains: query, } },
              { status: { contains: query, } },
            ],
          },              
          skip: offset,
          take: ITEMS_PER_PAGE,
          orderBy: {
              nombrecontacto: 'asc',
          },
      });
      return results;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch contacto.');
  }
}

export async function fetchContactosTotalPaginas(query: string) {
  try {
    const count = await prisma.contacto.count();
    return Math.ceil(Number(count) / ITEMS_PER_PAGE);
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total de paginas de contacto.');
  }
}

export async function fetchContactoById(id: string) {
    try {
        // Returns an object or null
        const contacto: TypeContacto | null = await prisma.contacto.findUnique({
            where: {
                id: id,
            },
        });
        if(contacto)
            return updateAttribute(contacto, 'cuota', contacto.cuota/100);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contacto.');
    }
}

export async function fetchContactoByEmail(email: string) {
    try {
        // Returns an object or null
        const contacto: TypeContacto | null = await prisma.contacto.findUnique({
            where: {
                correo: email,
            },
        });

        return contacto ? contacto.status : '';

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch contacto. ${error}`);
    }
}

export async function fetchReporteContactosEstadoCuotaGroupByTipo(query: string) {

    try {
        const results = await prisma.$queryRaw<TypeReporteEstadoCuotaGroupByTipo[]>`
            select
                "Lista".id,
                "Lista".nombrelista,
                COUNT("Contacto"."listaId") as cantidad,
                SUM(CASE WHEN "Contacto".status = 'pending' THEN "Contacto".cuota ELSE 0 END) AS total_pending,
                SUM(CASE WHEN "Contacto".status = 'paid' THEN "Contacto".cuota ELSE 0 END) AS total_paid,
                SUM("Contacto".cuota) as total                    
            from "Contacto"
            inner join "Lista" on "Lista".id = "Contacto"."listaId"
            where "Lista".nombrelista ILIKE ${`%${query}%`} OR 
                  "Contacto".status ILIKE ${`%${query}%`}
            group by "Lista".id, "Lista".nombrelista
            order by "Lista".nombrelista`;

            const elementos = results.map((elemento: any) => ({
                id: elemento.id,        
                nombrelista: elemento.nombrelista,
                cantidad: Number(elemento.cantidad),
                total_pending: formatCurrency(Number(elemento.total_pending)),
                total_paid: formatCurrency(Number(elemento.total_paid)),
                total: formatCurrency(Number(elemento.total)),                    
            }));
        return elementos;    
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch tipo reporte. ${error}`);
    }
}

export async function fetchReporteContactosEstadoCuotaGroupByGenero(query: string) {

    try {
        const results = await prisma.$queryRaw<TypeReporteEstadoCuotaGroupByGenero[]>`
            select
                "Contacto".sexo,
                COUNT("Contacto".sexo) as cantidad,
                SUM(CASE WHEN "Contacto".status = 'pending' THEN "Contacto".cuota ELSE 0 END) AS total_pending,
                SUM(CASE WHEN "Contacto".status = 'paid' THEN "Contacto".cuota ELSE 0 END) AS total_paid,
                SUM("Contacto".cuota) as total                    
            from "Contacto"
            where "Contacto".sexo ILIKE ${`%${query}%`} OR 
                  "Contacto".status ILIKE ${`%${query}%`}
            group by "Contacto".sexo
            order by "Contacto".sexo`;

            const elementos = results.map((elemento: any) => ({     
                sexo: elemento.sexo,
                cantidad: Number(elemento.cantidad),
                total_pending: formatCurrency(Number(elemento.total_pending)),
                total_paid: formatCurrency(Number(elemento.total_paid)),
                total: formatCurrency(Number(elemento.total)),                    
            }));

        return elementos;    
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch tipo reporte. ${error}`);
    }
}

export async function fetchReporteContactosEstadoCuota() {

    try {
        const results = await prisma.$queryRaw<TypeReporteEstadoCuotav0[]>`
            select
                SUM(CASE WHEN "Contacto".status = 'pending' THEN "Contacto".cuota ELSE 0 END) AS total_pending,
                SUM(CASE WHEN "Contacto".status = 'paid' THEN "Contacto".cuota ELSE 0 END) AS total_paid,
                SUM("Contacto".cuota) as total                    
            from "Contacto"`;

        const elementos = [{
            label: 'Pending',
            valor: Number(results[0].total_pending)/100
        },{
            label: 'Paid',
            valor: Number(results[0].total_paid)/100
        }];      

        return elementos;            
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch tipo reporte. ${error}`);
    }
}

//-------------------------------------------------------------------------------------