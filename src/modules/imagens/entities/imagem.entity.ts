import { Imagem } from "@prisma/client";

export class ImagemEntity implements Imagem{
    id: string;
    nome: string
    link: string;
    capa: boolean;
    projetoId: string;
 
    

}
