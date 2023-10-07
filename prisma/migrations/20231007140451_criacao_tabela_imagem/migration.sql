/*
  Warnings:

  - Added the required column `nome` to the `imagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagens" ADD COLUMN     "nome" TEXT NOT NULL;
