import { IsOptional, IsString } from "class-validator";

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  perfil: any;

  @IsOptional()
  projetos: any;
}
