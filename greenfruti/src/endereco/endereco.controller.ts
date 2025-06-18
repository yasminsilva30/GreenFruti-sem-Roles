/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  async create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  async findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const endereco = await this.enderecoService.findOne(+id);
    return endereco || { message: `Endereço com ID ${id} não encontrado` };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    const enderecoAtualizado = await this.enderecoService.update(+id, updateEnderecoDto);
    return enderecoAtualizado;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.enderecoService.remove(+id);
    return response;
  }
}
