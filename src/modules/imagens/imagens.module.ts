import { Logger, Module } from '@nestjs/common';
import { ImagensService } from './service/imagens.service';
import { ImagensController } from './controller/imagens.controller';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      dest: './uploads/' + process.env.FILE_PATH,
    })
  ],
  controllers: [ImagensController],
  providers: [ImagensService, PrismaService, Logger]
})
export class ImagensModule {}
