import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { TagsModule } from './modules/tags/tags.module';
import { ProjetoModule } from './projeto/projeto.module';
import * as ConfigEnv from '@nestjs/config';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsuarioModule,
    TagsModule,
    ProjetoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
