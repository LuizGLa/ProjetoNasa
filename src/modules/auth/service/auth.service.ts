import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../../usuarios/service/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.buscaPorLogin(login);
    if (usuario) {
      const matched = await this.usuarioService.comparaSenha(
        senha,
        usuario.senha,
      );
      if (matched === 'Ativo') {
        return usuario;
      } else {
        return null;
      }
    }
    return null;
  }

  async login(usuario: any) {
    const payload = {
      login: usuario.login,
      sub: usuario.id,
    };
    const usuarioId = usuario.id;

    return {
      access_token: this.jwtService.sign(payload),
      usuarioId,
    };
  }
}
