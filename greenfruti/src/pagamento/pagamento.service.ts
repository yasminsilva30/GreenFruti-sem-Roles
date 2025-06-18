/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepo: Repository<Pagamento>,

    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,

    @InjectRepository(Carrinho)
    private carrinhoRepo: Repository<Carrinho>,
  ) {}

  async create(dto: CreatePagamentoDto & { carrinhoId: number }) {
    const carrinho = await this.carrinhoRepo.findOne({
      where: { id: dto.carrinhoId },
      relations: ['cliente', 'itens', 'itens.produto'],
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const valorTotal = carrinho.valorTotal;

    let pagamento = await this.pagamentoRepo.findOne({
      where: { carrinho: { id: dto.carrinhoId } },
    });

    if (pagamento) {
      pagamento.metodo = dto.metodo;
      pagamento.status = dto.status;
      pagamento.valor = valorTotal;
    } else {
      pagamento = this.pagamentoRepo.create({
        metodo: dto.metodo,
        valor: valorTotal,
        status: dto.status,
        carrinho,
      });
    }

    try {
      const savedPagamento = await this.pagamentoRepo.save(pagamento);

      if (dto.status.toLowerCase() === 'confirmado') {
        let pedidoExistente = await this.pedidoRepo.findOne({
          where: { carrinhos: { id: carrinho.id } },
          relations: ['carrinhos'],
        });

        if (!pedidoExistente) {
          const novoPedido = this.pedidoRepo.create({
            cliente: carrinho.cliente,
            carrinhos: [carrinho],
            pagamento: savedPagamento,
            total: carrinho.valorTotal,
            status: 'Confirmado',
          });

          pedidoExistente = await this.pedidoRepo.save(novoPedido);
        }

        carrinho.pedido = pedidoExistente;
        await this.carrinhoRepo.save(carrinho);
      }

      return savedPagamento;
    } catch (error) {
      console.error('ERRO REAL:', error);
      throw new Error('Erro ao salvar o pagamento');
    }
  }

  async findAll() {
    const pagamentos = await this.pagamentoRepo.find({
      relations: [
        'carrinho',
        'carrinho.cliente',
        'carrinho.cliente.enderecos',
      ],
    });

    return pagamentos.map((pag) => ({
      ...pag,
      endereco:
        pag.carrinho.cliente.enderecos.length > 0
          ? pag.carrinho.cliente.enderecos[0]
          : null,
      carrinho: {
        ...pag.carrinho,
        cliente: {
          ...pag.carrinho.cliente,
          enderecos: undefined,
        },
      },
    }));
  }

  async findOne(id: number) {
    const pagamento = await this.pagamentoRepo.findOne({
      where: { id },
      relations: [
        'carrinho',
        'carrinho.cliente',
        'carrinho.cliente.enderecos',
      ],
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return {
      ...pagamento,
      endereco:
        pagamento.carrinho.cliente.enderecos.length > 0
          ? pagamento.carrinho.cliente.enderecos[0]
          : null,
      carrinho: {
        ...pagamento.carrinho,
        cliente: {
          ...pagamento.carrinho.cliente,
          enderecos: undefined,
        },
      },
    };
  }

  async update(id: number, dto: UpdatePagamentoDto) {
    const pagamento = await this.findOne(id);

    if (dto.metodo !== undefined) pagamento.metodo = dto.metodo;
    if (dto.status !== undefined) pagamento.status = dto.status;

    return this.pagamentoRepo.save(pagamento);
  }

  async remove(id: number) {
    const pagamento = await this.findOne(id);
    await this.pagamentoRepo.delete(pagamento.id);
  }
}
