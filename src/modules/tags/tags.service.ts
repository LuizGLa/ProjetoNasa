import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTagDto) {
    return await this.prisma.tag.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.tag.findFirst({
      where: { id },
    });
  }

  async update(id: string, data: UpdateTagDto) {
    return await this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.tag.delete({
      where: { id },
    });
  }
}
