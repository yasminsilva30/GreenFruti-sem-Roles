/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { DonoLoja } from 'src/dono-loja/entities/dono-loja.entity';

@Injectable()
export class LojasService {
  constructor(
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
    @InjectRepository(DonoLoja)
    private donoLojaRepository: Repository<DonoLoja>,
  ) {}

  async create(createLojaDto: CreateLojaDto) {
    const { 'dono-lojaId': donoLojaId, ...rest } = createLojaDto;

    const donoLoja = await this.donoLojaRepository.findOne({ where: { id: donoLojaId } });

    if (!donoLoja) {
      throw new NotFoundException(`Dono da loja com ID ${donoLojaId} não encontrado.`);
    }

    const loja = this.lojaRepository.create({
      ...rest,
      donoLoja,
    });

    return this.lojaRepository.save(loja);
  }

  findAll() {
    return this.lojaRepository.find();
  }

  findOne(id: number) {
    return this.lojaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    const loja = await this.lojaRepository.findOne({ where: { id } });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada.`);
    }
    const lojaAtualizada = { ...loja, ...updateLojaDto };
    return this.lojaRepository.save(lojaAtualizada);
  }

  remove(id: number) {
    return this.lojaRepository.delete(id);
  }
}
