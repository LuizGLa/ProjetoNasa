/*
  Warnings:

  - You are about to drop the column `createdAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `situacao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "nivel",
DROP COLUMN "nome",
DROP COLUMN "situacao",
DROP COLUMN "updatedAt",
ADD COLUMN     "perfilId" TEXT;

-- CreateTable
CREATE TABLE "perfis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "perfil_img" TEXT NOT NULL,
    "tagId" TEXT,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "capa" BOOLEAN NOT NULL,
    "projetoId" TEXT,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projetos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tagId" TEXT,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfis_nome_key" ON "perfis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_perfil_img_key" ON "perfis"("perfil_img");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
