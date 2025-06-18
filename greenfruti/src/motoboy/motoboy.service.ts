/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMotoboyDto } from './dto/create-motoboy.dto';
import { UpdateMotoboyDto } from './dto/update-motoboy.dto';
import { Motoboy } from './entities/motoboy.entity';

@Injectable()
export class MotoboysService {
  constructor(
    @InjectRepository(Motoboy)
    private motoboyRepository: Repository<Motoboy>,
  ) {}

  create(dto: CreateMotoboyDto) {
    const motoboy = this.motoboyRepository.create(dto);
    return this.motoboyRepository.save(motoboy);
  }

  findAll() {
    return this.motoboyRepository.find({ relations: ['entregas'] });
  }

  findOne(id: number) {
    return this.motoboyRepository.findOne({
      where: { id },
      relations: ['entregas'],
    });
  }

  async update(id: number, dto: UpdateMotoboyDto) {
    const motoboy = await this.motoboyRepository.findOne({ where: { id } });
    if (!motoboy) {
      throw new NotFoundException(`Motoboy com ID ${id} não encontrado.`);
    }

    const updatedMotoboy = this.motoboyRepository.merge(motoboy, dto);

    return this.motoboyRepository.save(updatedMotoboy);
  }

  async remove(id: number) {
    const motoboy = await this.motoboyRepository.findOne({ where: { id } });
    if (!motoboy) {
      throw new NotFoundException(`Motoboy com ID ${id} não encontrado.`);
    }
    return this.motoboyRepository.delete(id);
  }
}
