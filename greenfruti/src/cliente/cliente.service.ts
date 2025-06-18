/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['enderecos', 'pedidos', 'carrinhos'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['enderecos', 'pedidos', 'carrinhos'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }
  
    await this.clienteRepository.update(id, dto);
  
    return this.findOne(id);
  }  

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.clienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }
}
