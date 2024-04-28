-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lista" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombrelista" VARCHAR(100) NOT NULL,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "avatarurl" TEXT NOT NULL,
    "nombrecontacto" VARCHAR(255) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "sexo" VARCHAR(1) NOT NULL,
    "edad" INTEGER NOT NULL,
    "cuota" INTEGER NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "listaId" UUID NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lista_nombrelista_key" ON "Lista"("nombrelista");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_nombrecontacto_key" ON "Contacto"("nombrecontacto");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_correo_key" ON "Contacto"("correo");

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "Lista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
