import {
  Body,
  Controller,
  Get,
  Post,
  // UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AtualizaUsuarioDto } from '../dto/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { UsuarioService } from '../service/usuario.service';
// import { Roles } from 'src/modules/auth/roles/roles.decorator';
// import { Role } from '../enum/usuario-roles.enum';
// import { RolesGuard } from '../../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/auth/decorators/is-public-decorator';

@IsPublic()
@ApiBearerAuth()
@Controller('usuarios')
@ApiTags('Usuários')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard(), RolesGuard)
  async cria(@Body() dados: CriaUsuarioDto): Promise<any> {
    return this.usuarioService.cria(dados);
  }

  @Get()
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard(), RolesGuard)
  async buscaTodos() {
    return this.usuarioService.buscaTodos();
  }

  @Get('/:id')
  // @UseGuards(AuthGuard())
  async buscaPorId(@Param('id') id: string): Promise<any> {
    return this.usuarioService.buscaPorId(id);
  }

  @Put('/:id')
  // @UseGuards(AuthGuard())
  async atualiza(@Param('id') id: string, @Body() data: AtualizaUsuarioDto) {
    return this.usuarioService.atualiza(id, data);
  }

  @Delete('/:id')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard(), RolesGuard)
  async deleta(@Param('id') id: string) {
    return this.usuarioService.deleta(id);
  }
}
