// src/projects/entities/project.entity.ts

import { Imagem, Tag } from "@prisma/client";

export class Projeto  {
  id?: string;
  descricao: string;
  // imagens?: Imagem[];
  // tag?: Tag;
}
