import { Injectable } from "@nestjs/common";
import { CreatePerfilDto } from "./dto/create-perfil.dto";
import { UpdatePerfilDto } from "./dto/update-perfil.dto";
import { PrismaService } from "src/plugins/database/services/prisma.service";

@Injectable()
export class PerfisService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(data: CreatePerfilDto) {
    return await this.prisma.perfil.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.perfil.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.perfil.findUnique({
      where : {id}
    })
  }

  async update(id: string, data: UpdatePerfilDto) {
    return await this.prisma.perfil.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return `This action removes a #${id} perfi`;
  }
}
