/*
  Warnings:

  - You are about to drop the column `tagId` on the `projetos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projetos" DROP CONSTRAINT "projetos_tagId_fkey";

-- AlterTable
ALTER TABLE "projetos" DROP COLUMN "tagId";

-- CreateTable
CREATE TABLE "_ProjetoToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjetoToTag_AB_unique" ON "_ProjetoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjetoToTag_B_index" ON "_ProjetoToTag"("B");

-- AddForeignKey
ALTER TABLE "_ProjetoToTag" ADD CONSTRAINT "_ProjetoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoToTag" ADD CONSTRAINT "_ProjetoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
