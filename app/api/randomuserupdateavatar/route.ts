import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { 
        correo,
        avatarurl
    } = await req.json();

    // Comprobar si existe el contacto
    const contacto = await prisma.contacto.update({
        where: {
            correo: correo,
        },
        data: {
            avatarurl: avatarurl,
        },
    })

    if(!contacto) {
        return NextResponse.json({ error: 'No existe el contacto', status: 404 });
    }

    return NextResponse.json(contacto, { status: 200 });
}