import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Module({
  imports: [],
  controllers: [ProjetoController],
  providers: [ProjetoService, PrismaService]
})
export class ProjetoModule {}
