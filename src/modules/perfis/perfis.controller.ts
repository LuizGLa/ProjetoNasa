import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Post()
  create(@Body() createPerfiDto: CreatePerfilDto) {
    return this.perfisService.create(createPerfiDto);
  }

  @Get()
  findAll() {
    return this.perfisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfiDto: UpdatePerfilDto) {
    return this.perfisService.update(id, updatePerfiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfisService.remove(id);
  }
}
