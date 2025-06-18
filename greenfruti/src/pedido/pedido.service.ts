/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Pagamento)
    private pagamentoRepo: Repository<Pagamento>,
    @InjectRepository(Entrega)
    private entregaRepo: Repository<Entrega>,
    @InjectRepository(Carrinho)
    private carrinhoRepo: Repository<Carrinho>,
  ) {}

  async create(dto: CreatePedidoDto): Promise<any> {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    let carrinhos: Carrinho[] = [];

    if (dto.carrinhos && dto.carrinhos.length > 0) {
      carrinhos = await this.carrinhoRepo.find({
        where: { id: In(dto.carrinhos) },
        relations: ['itens'],
      });
    } else {
      carrinhos = await this.carrinhoRepo.find({
        where: { cliente: { id: dto.clienteId }, pedido: IsNull() },
        relations: ['itens'],
      });
    }

    if (carrinhos.length === 0) {
      throw new NotFoundException('Nenhum item no carrinho para criar o pedido');
    }

    const total = carrinhos.reduce((acc, carrinho) => {
      const somaItens = carrinho.itens?.reduce((accItens, item) => accItens + Number(item.precoTotal), 0) || 0;
      return acc + somaItens;
    }, 0);

    const pedido = this.pedidoRepo.create({
      cliente,
      total,
      status: 'Pedido finalizado com sucesso',
    });

    const pagamento = await this.pagamentoRepo.findOne({ where: { id: dto.pagamentoId } });
    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    pedido.pagamento = pagamento;

    const entrega = await this.entregaRepo.findOne({ where: { id: dto.entregaId } });
    if (!entrega) {
      throw new NotFoundException('Entrega não encontrada');
    }
    pedido.entrega = entrega;

    const savedPedido = await this.pedidoRepo.save(pedido);

    for (const carrinho of carrinhos) {
      carrinho.pedido = savedPedido;
      await this.carrinhoRepo.save(carrinho);
    }

    return {
      entregaId: savedPedido.entrega.id,
      valorTotal: savedPedido.total,
      status: savedPedido.status,
      dataFinalizacao: savedPedido['createdAt'] || new Date(),
    };
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      relations: ['cliente', 'pagamento', 'entrega', 'carrinhos'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'pagamento', 'entrega', 'carrinhos', 'carrinhos.itens', 'carrinhos.itens.produto'],
    });
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    if (dto.status !== undefined) pedido.status = dto.status;
    return this.pedidoRepo.save(pedido);
  }

  remove(id: number): Promise<void> {
    return this.pedidoRepo.delete(id).then(() => undefined);
  }
}
