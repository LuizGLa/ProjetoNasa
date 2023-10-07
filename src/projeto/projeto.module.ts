import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { ImagensService } from 'src/modules/imagens/service/imagens.service';
import { TagsService } from 'src/modules/tags/tags.service';

@Module({
  imports: [ImagensService, TagsService],
  controllers: [ProjetoController],
  providers: [ProjetoService, PrismaService]
})
export class ProjetoModule {}
