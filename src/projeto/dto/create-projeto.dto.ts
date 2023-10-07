// import { Imagem, Tag } from "@prisma/client";
import { Imagem, Tag } from "@prisma/client";
import { Projeto } from "../entities/projeto.entity";
import { IsOptional, IsString } from "class-validator";


export class CreateProjetoDto extends Projeto {

    @IsString({ message: "Descrição deve ser uma string" })
    descricao: string;
    
}

