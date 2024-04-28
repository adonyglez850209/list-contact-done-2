import { getNumberRandom } from "@/lib/utils";

import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pagina, cantidad } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_RANDOMUSER_BASE_URL}?page=${pagina}&results=${cantidad}`)

  const data = await res.json();  

  let candidatos = Array();  

  for (const user of data.results) {
    const exists = await prisma.contacto.findUnique({
      where: {
        correo: user.email,
      },
    });
    candidatos.push({
      id: user.login.uuid,
      lista: user.location.country,
      avatarurl: user.picture.large,
      nombrecontacto: user.name.title + " " + user.name.first + " " + user.name.last,
      correo: user.email,  
      sexo: user.gender == "female" ? 'f' : 'm',
      edad: user.dob.age,
      cuota: getNumberRandom(1 , 1000),
      fecha: user.registered.date,
      status: exists ? exists.status : '' 
    });
  }

  return NextResponse.json(candidatos, { status: 200 });
}