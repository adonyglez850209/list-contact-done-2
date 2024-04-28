'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "@/prisma/prisma";

const FormListaSchema = z.object({
    id: z.string(),
    nombrelista: z.string().min(5).max(100),
});

const ListaOmit = FormListaSchema.omit({ id: true });

// This is temporary
export type ListaState = {
    errors?: {
        nombrelista?: string[];
    };
    message?: string | null;
};

export async function ListaActionCreate(prevState: ListaState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = ListaOmit.safeParse({
        nombrelista: formData.get('nombrelista'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Tipo.',
        };
    }

    // Prepare data for insertion into the database
    const { nombrelista} = validatedFields.data;

    // Insert data into the database
    try {
        const tipo = await prisma.lista.create({
            data: {
                nombrelista: nombrelista,
            }
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Tipo.',
        };
    }

    revalidatePath('/lc/listas');
    redirect('/lc/listas');
}

export async function ListaActionUpdate(
    id: string,
    prevState: ListaState,
    formData: FormData,
) {
    // Validate form fields using Zod
    const validatedFields = ListaOmit.safeParse({
        nombrelista: formData.get('nombrelista'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: `Missing Fields. Failed to Update ${validatedFields.error.flatten().fieldErrors.nombrelista}.`,
        };
    }

    // Prepare data for update the database
    const { nombrelista} = validatedFields.data;

    // Update data in the database
    try {
        const tipo = await prisma.lista.update({
            where: {
                id: id,
            },
            data: {
                nombrelista: nombrelista,
            },
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: `Database Error: Failed to Update ${error}.`,
        };
    }

    revalidatePath('/lc/listas');
    redirect('/lc/listas');
}

export async function ListaActionDelete(id: string) {
    try {
        const deleteUser = await prisma.lista.delete({
            where: {
                id: id,
            },
        })
        revalidatePath('/lc/listas');
        return { message: 'Tipo eliminado' };
    } catch (error) {
        return { message: 'Database Error: Failed to delete tipo.' };
    }
    revalidatePath('/lc/listas');
}

//-------------------------------------------------------------------------------------

const FormContactoSchema = z.object({
    id: z.string(),
    slistaId: z.string({
      invalid_type_error: 'Por favor, seleccione una lista.',
    }),
    nombrecontacto: z.string().min(5).max(255),
    correo: z.string().min(6).max(100),
    sexo: z.string({
      invalid_type_error: 'Por favor, seleccione un genero.',
    }).min(1).max(1),
    edad: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),  
    cuota: z.coerce
      .number()
      .gt(0, { message: 'Por favor, entre un numero mayor que $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Por favor, marque el estado de la donacion.',
    }),
    avatarurl: z.string(),
    date: z.string(),
});
  
const CreateContactoOmit = FormContactoSchema.omit({ id: true, date: true });
const UpdateContactoOmit = FormContactoSchema.omit({ date: true, id: true });

// This is temporary
export type ContactoState = {
    errors?: {
        slistaId?: string[];
        nombrecontacto?: string[];
        correo?: string[];
        sexo?: string[];
        edad?: string[];
        cuota?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function ContactoActionCreate(prevState: ContactoState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateContactoOmit.safeParse({
      slistaId: formData.get('slistaId'),
      nombrecontacto: formData.get('nombrecontacto'),
      correo: formData.get('correo'),
      sexo: formData.get('sexo'),
      edad: formData.get('edad'),
      cuota: formData.get('cuota'),
      status: formData.get('status'),
      avatarurl: formData.get('avatarurl'),
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Contacto.',
      };
    }
  
    // Prepare data for insertion into the database
    const { slistaId, nombrecontacto, correo, sexo, edad, cuota, status, avatarurl } = validatedFields.data;
    const cuotaInCents = cuota * 100;
    //const date = new Date().toISOString().split('T')[0];
    const date = new Date().toISOString();

    // Insert data into the database
    try {
        const contacto = await prisma.contacto.create({
            data: {
                listaId: slistaId,
                avatarurl: avatarurl,
                nombrecontacto: nombrecontacto,
                correo: correo,
                sexo: sexo,
                edad: edad,
                status: status,
                cuota: cuotaInCents,
                fecha: date,
            }
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: `Database Error: Failed to Create Contacto ${error}.`,
        };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/lc/contactos');
    redirect('/lc/contactos');
}

export async function ContactoActionUpdate(
    id: string,
    prevState: ContactoState,
    formData: FormData,
) {
    const validatedFields = UpdateContactoOmit.safeParse({
        slistaId: formData.get('slistaId'),
        nombrecontacto: formData.get('nombrecontacto'),
        correo: formData.get('correo'),
        sexo: formData.get('sexo'),
        edad: formData.get('edad'),
        cuota: formData.get('cuota'),
        status: formData.get('status'),
        avatarurl: formData.get('avatarurl'),
    });

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Contacto.',
        };
    }

    const { slistaId, nombrecontacto, correo, edad, sexo, cuota, status, avatarurl } = validatedFields.data;
    const cuotaInCents = cuota * 100;

    // Update data in the database
    try {
        const contacto = await prisma.contacto.update({
            where: {
                id: id,
            },
            data: {
                listaId: slistaId,
                avatarurl: avatarurl,                
                nombrecontacto: nombrecontacto,
                correo: correo,
                edad: edad,
                sexo: sexo,
                cuota: cuotaInCents,
                status: status,
            },
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: `Database Error: Failed to Update ${error}.`,
        };
    }

    revalidatePath('/lc/contactos');
    redirect('/lc/contactos');
}

export async function ContactoActionUpdateStatus(
    id: string,
    status: string
) {
    // Update data in the database
    try {
        const contacto = await prisma.contacto.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: `Database Error: Failed to Update ${error}.`,
        };
    }
}

export async function ContactoActionDelete(id: string) {
    try {
        const deleteUser = await prisma.contacto.delete({
            where: {
                id: id,
            },
        })
        revalidatePath('/lc/contactos');
        return { message: 'Contacto eliminado' };
    } catch (error) {
        return { message: 'Database Error: Failed to delete contacto.' };
    }
}