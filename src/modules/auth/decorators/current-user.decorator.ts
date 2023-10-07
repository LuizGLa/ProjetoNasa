import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CriaUsuarioDto } from 'src/modules/usuarios/dto/cria-usuario.dto';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: CriaUsuarioDto;
}
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CriaUsuarioDto => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
