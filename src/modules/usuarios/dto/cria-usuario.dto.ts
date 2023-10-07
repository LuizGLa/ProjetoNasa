import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class CriaUsuarioDto {
  @IsNotEmpty({
    message: "Informe o Nome",
  })
  @IsString()
  nome: string;

  @IsNotEmpty({
    message: "Informe o Email",
  })
  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsNotEmpty({
    message: "Informe a Senha",
  })
  @IsString()
  senha: string;

  @IsOptional()
  perfil: any;

  @IsOptional()
  tags: any;
}
