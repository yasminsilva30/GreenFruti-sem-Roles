/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto) {
    const { clienteId, ...dadosEndereco } = createEnderecoDto;
  
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });
  
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
  
    const endereco = this.enderecoRepository.create({
      ...dadosEndereco,
      cliente: cliente,
    });
  
    return this.enderecoRepository.save(endereco);
  }  
  
  findAll() {
    return this.enderecoRepository.find({ relations: ['cliente'] });
  }

  findOne(id: number) {
    return this.enderecoRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    const endereco = await this.enderecoRepository.findOne({ where: { id } });
    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
    }

    const enderecoAtualizado = this.enderecoRepository.merge(endereco, updateEnderecoDto); 
    return this.enderecoRepository.save(enderecoAtualizado);
  }

  async remove(id: number) {
    const result = await this.enderecoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
    }
    return { message: `Endereço com ID ${id} removido com sucesso` };
  }
}
