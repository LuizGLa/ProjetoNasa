import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { file, image } from 'pdfkit';
import { NotFoundError, buffer } from 'rxjs';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { CreateImagemDto } from '../dto/create-imagem.dto';

@Injectable()
export class ImagensService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async salvarImagem(data: CreateImagemDto) {
    const arquivoExiste = await this.prismaService.imagem.findFirst({
      where: {
        nome: data.nome,
        projetoId: data.projetoId,
        
      },
    });
    
    if (arquivoExiste) {
      this.logger.error('erro: Arquivo já existe ', {
        logId: 'service.arquivos.service.cria.arquivo',
      });
      throw new ConflictException('O arquivo já existe');
    }

    const capaExiste =  await this.prismaService.imagem.findFirst({
      where: {
        capa: true,
        projetoId: data.projetoId
      },
    });
    console.log(capaExiste);
    
    if (capaExiste) {
      this.logger.error('erro: Bem já possui imagem de capa ', {
        logId: 'service.arquivos.service.salvaImagem.arquivo',
      });
      throw new ConflictException('Bem já possui imagem de capa');
    }

    return await this.prismaService.imagem.create({
      data,
    });
  }

  async buscarTodos(): Promise<any[]> {
    return await this.prismaService.imagem.findMany();
  }

  async buscarPorId(id: string) {
    const imagem = await this.prismaService.imagem.findFirst({
      where: {
        id,
      },
    });

    if (!imagem) {
      this.logger.error('erro, Imagem não existe!');

      throw new NotFoundException('Imagem não existe!');
    }

    return imagem;
  }

  async excluirImagem(id: string) {
    const imagem = await this.prismaService.imagem.findFirst({
      where: { id },
    });
    if (!imagem) {
      this.logger.error('erro, Imagem não existe!');

      throw new NotFoundException('Imagem não existe!');
    }

    try {
      const retorno = await this.prismaService.imagem.delete({
        where: {
          id,
        },
      });
      return retorno;
    } catch (error) {
      throw new Error(
        `Erro ao excluir a imagem no banco de dados: ${error.message}`,
      );
    }
  }
}
