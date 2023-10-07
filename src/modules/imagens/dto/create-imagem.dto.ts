import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateImagemDto {
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do arquivo',
  })
  nome: string;

  @IsBoolean()
  capa: boolean;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty({
    message: 'Informe o id do projeto',
  })
  projetoId: string;
}
