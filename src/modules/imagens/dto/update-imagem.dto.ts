import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateImagenDto {
  @IsString()
  @IsOptional()
  nome: string;

  @IsBoolean()
  @IsOptional()
  capa: boolean;
  
  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  projetoId: string;
}
