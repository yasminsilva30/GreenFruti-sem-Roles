/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Controller('entregas')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Post()
  create(@Body() dto: CreateEntregaDto) {
    return this.entregaService.create(dto);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEntregaDto) {
    return this.entregaService.update(+id, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
