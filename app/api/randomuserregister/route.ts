import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { 
        lista,
        nombrecontacto,
        correo,
        sexo,
        edad,
        cuota,
        fecha
    } = await req.json();

    // Comprobar si existe la lista sino se crea
    let tipo = await prisma.lista.findUnique({
        where: {
            nombrelista: lista,
        },
    });

    if(!tipo) {
        tipo = await prisma.lista.create({
            data: {
                nombrelista: lista,
            }
        })    
    }

    // Comprobar si existe el contacto sino se crea
    let contacto = await prisma.contacto.findUnique({
        where: {
            correo: correo,
        },
    });

    if(contacto) {
        return NextResponse.json({ error: 'Ya existe el contacto', status: 404 });
    }

    contacto = await prisma.contacto.create({
        data: {
            listaId: tipo.id,
            avatarurl: process.env.NEXT_PUBLIC_IMAGENOTFOUNT_URL || '',
            nombrecontacto: nombrecontacto,
            correo: correo,
            sexo: sexo,
            edad: edad,
            cuota: cuota*100,
            fecha: fecha,
            status: "pending",            
        }
    })

    return NextResponse.json(contacto, { status: 200 });
}