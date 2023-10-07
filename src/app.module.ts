import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { TagsModule } from './modules/tags/tags.module';
import { PerfisModule } from './modules/perfis/perfis.module';
import * as ConfigEnv from '@nestjs/config';
import { ImagensModule } from './modules/imagens/imagens.module';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsuarioModule,
    TagsModule,
    PerfisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
