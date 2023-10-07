import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { Projeto, Imagem, Tag } from '@prisma/client';

@Injectable()
export class ProjetoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateProjetoDto){
    return await this.prisma.projeto.create({
       data,
    })
  
  }

  async findAll(): Promise<Projeto[]> {
    const projetos = await this.prisma.projeto.findMany();
    return projetos;
  }

  async findOne(id: string) {
    return await this.prisma.projeto.findFirst({
      where: {
        id
      }
    });
  }

//   async update(id: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
//     const { descricao, imagens, tag } = updateProjetoDto;
//     const projeto = await this.prisma.projeto.update({
//       where: {
//         id: id.toString()
//       },
//       data: {
//         descricao,
//         imagens: {
//           create: imagens?.filter(imagem => !imagem.id),
//           updateMany: imagens?.filter(imagem => imagem.id).map(imagem => ({
//             where: {
//               id: imagem.id
//             },
//             data: {
//               url: imagem.url
//             }
//           })),
//           deleteMany: imagens?.filter(imagem => imagem.deleted).map(imagem => ({
//             id: imagem.id
//           }))
//         },
//         tag: {
//           connect: {
//             id: tag?.id
//           },
//           disconnect: tag?.deleted ? true : undefined
//         }
//       },
//       include: {
//         imagens: true,
//         tag: true
//       }
//     });
//     return projeto;
//   }

//   async remove(id: number): Promise<Projeto> {
//     const projeto = await this.prisma.projeto.delete({
//       where: {
//         id
//       }
//     });
//     return projeto;
//   }
}