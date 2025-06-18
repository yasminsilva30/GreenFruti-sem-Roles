/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DonoLojaService } from './dono-loja.service';
import { CreateDonoLojaDto } from './dto/create-dono-loja.dto';
import { UpdateDonoLojaDto } from './dto/update-dono-loja.dto';

@Controller('donos-loja')
export class DonoLojaController {
  constructor(private readonly donoLojaService: DonoLojaService) {}

  @Post()
  create(@Body() createDonoLojaDto: CreateDonoLojaDto) {
    return this.donoLojaService.create(createDonoLojaDto);
  }

  @Get()
  findAll() {
    return this.donoLojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.donoLojaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDonoLojaDto: UpdateDonoLojaDto) {
    return this.donoLojaService.update(id, updateDonoLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.donoLojaService.remove(id);
  }
}
