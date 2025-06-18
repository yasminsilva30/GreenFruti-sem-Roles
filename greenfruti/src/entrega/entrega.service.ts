/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrega } from './entities/entrega.entity';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private entregaRepository: Repository<Entrega>,
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Motoboy)
    private motoboyRepository: Repository<Motoboy>,
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>
  ) {}

  async create(dto: CreateEntregaDto) {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { id: dto.pagamentoId },
      relations: ['carrinho', 'carrinho.cliente', 'carrinho.cliente.enderecos'],
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    const motoboy = dto.motoboyId
      ? await this.motoboyRepository.findOneBy({ id: dto.motoboyId })
      : null;

    const cliente = pagamento.carrinho.cliente;
    const primeiroEndereco = cliente?.enderecos?.length > 0 ? cliente.enderecos[0] : null;

    const entrega = new Entrega();
    entrega.pagamento = pagamento;
    entrega.motoboy = motoboy;
    entrega.endereco = primeiroEndereco;
    entrega.status = dto.status || 'pendente';
    entrega.dataEntrega = new Date(dto.dataEntrega || new Date().toISOString());

    const savedEntrega = await this.entregaRepository.save(entrega);

    const entregaComRelacionamentos = await this.entregaRepository.findOne({
      where: { id: savedEntrega.id },
      relations: ['pagamento', 'motoboy', 'endereco'],
    });

    return entregaComRelacionamentos;
  }

  async update(id: number, dto: UpdateEntregaDto) {
    const entrega = await this.entregaRepository.findOne({
      where: { id },
      relations: ['motoboy', 'endereco', 'pagamento'],
    });

    if (!entrega) {
      throw new NotFoundException('Entrega não encontrada');
    }

    if (dto.status) entrega.status = dto.status;
    if (dto.dataEntrega) entrega.dataEntrega = new Date(dto.dataEntrega);

    if (dto.motoboyId) {
      const motoboy = await this.motoboyRepository.findOne({ where: { id: dto.motoboyId } });
      if (!motoboy) throw new NotFoundException('Motoboy não encontrado');
      entrega.motoboy = motoboy;
    }

    if (dto.enderecoId) {
      const endereco = await this.enderecoRepository.findOne({ where: { id: dto.enderecoId } });
      if (!endereco) throw new NotFoundException('Endereço não encontrado');
      entrega.endereco = endereco;
    }

    return this.entregaRepository.save(entrega);
  }

  async findAll(): Promise<Entrega[]> {
    return this.entregaRepository.find({
      relations: ['motoboy', 'endereco', 'pagamento'],
    });
  }

  async findOne(id: number): Promise<Entrega> {
    const entrega = await this.entregaRepository.findOne({
      where: { id },
      relations: ['motoboy', 'endereco', 'pagamento'],
    });

    if (!entrega) throw new NotFoundException('Entrega não encontrada');
    return entrega;
  }

  async remove(id: number): Promise<void> {
    const entrega = await this.entregaRepository.findOneBy({ id });
    if (!entrega) throw new NotFoundException('Entrega não encontrada');
    await this.entregaRepository.delete(id);
  }
}
