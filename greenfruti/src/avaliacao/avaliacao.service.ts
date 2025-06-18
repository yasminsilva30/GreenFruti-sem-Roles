/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,

    @InjectRepository(Motoboy)
    private motoboyRepository: Repository<Motoboy>,
  ) {}

  async create(dto: CreateAvaliacaoDto) {
    const cliente = await this.clienteRepository.findOneBy({ id: dto.clienteId });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const loja = await this.lojaRepository.findOneBy({ id: dto.lojaId });
    if (!loja) throw new NotFoundException('Loja não encontrada');

    let motoboy = null;
    if (dto.motoboyId) {
      motoboy = await this.motoboyRepository.findOneBy({ id: dto.motoboyId });
      if (!motoboy) throw new NotFoundException('Motoboy não encontrado');
    }

    const avaliacao = new Avaliacao();
    avaliacao.cliente = cliente;
    avaliacao.loja = loja;
    avaliacao.motoboy = motoboy;
    avaliacao.nota = dto.nota;
    avaliacao.comentario = dto.comentario?.trim() || null;

    return this.avaliacaoRepository.save(avaliacao);
  }

  findAll() {
    return this.avaliacaoRepository.find({
      relations: ['cliente', 'loja', 'motoboy'],
    });
  }

  findOne(id: number) {
    return this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['cliente', 'loja', 'motoboy'],
    });
  }

  update(id: number, dto: UpdateAvaliacaoDto) {
    return this.avaliacaoRepository.update(id, dto);
  }

  remove(id: number) {
    return this.avaliacaoRepository.delete(id);
  }
}