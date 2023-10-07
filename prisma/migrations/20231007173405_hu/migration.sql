-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "perfil_img" TEXT NOT NULL,

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

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerfilToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjetoToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_login_key" ON "usuarios"("login");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_nome_key" ON "perfis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_perfil_img_key" ON "perfis"("perfil_img");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_PerfilToTag_AB_unique" ON "_PerfilToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PerfilToTag_B_index" ON "_PerfilToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjetoToTag_AB_unique" ON "_ProjetoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjetoToTag_B_index" ON "_ProjetoToTag"("B");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfilToTag" ADD CONSTRAINT "_PerfilToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfilToTag" ADD CONSTRAINT "_PerfilToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoToTag" ADD CONSTRAINT "_ProjetoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoToTag" ADD CONSTRAINT "_ProjetoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
