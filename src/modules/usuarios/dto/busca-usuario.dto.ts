import { IsOptional, IsString } from 'class-validator';

export class BuscaUsuarioFilterDto {

  @IsOptional()
  @IsString()
  pesquisa?: string;

  @IsOptional()
  @IsString()
  pagina?: string;
}
