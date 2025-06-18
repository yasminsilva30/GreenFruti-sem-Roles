/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrinho, CarrinhoItem } from './entities/carrinho.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(CarrinhoItem)
    private itemRepository: Repository<CarrinhoItem>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(dto: CreateCarrinhoDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    let carrinho = this.carrinhoRepository.create({ cliente });
    carrinho = await this.carrinhoRepository.save(carrinho);

    const produto = await this.produtoRepository.findOne({ where: { id: dto.produtoId } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    const precoTotal = produto.preco * dto.quantidade;
    const item = this.itemRepository.create({
      carrinho,
      produto,
      quantidade: dto.quantidade,
      precoTotal,
    });
    await this.itemRepository.save(item);

    const valorTotal = await this.calcularTotal(carrinho.id);
    carrinho.valorTotal = valorTotal;
    await this.carrinhoRepository.save(carrinho);

    const carrinhoComItens = await this.carrinhoRepository.findOne({
      where: { id: carrinho.id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });

    return carrinhoComItens;
  }

  async calcularTotal(carrinhoId: number): Promise<number> {
    const itens = await this.itemRepository.find({
      where: { carrinho: { id: carrinhoId } },
      relations: ['produto'],
    });

    return itens.reduce((total, item) => {
      return total + Number(item.precoTotal);
    }, 0);
  }

  async adicionarItemAoCarrinho(dto: {
    carrinhoId: number;
    produtoId: number;
    quantidade: number;
  }) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id: dto.carrinhoId },
      relations: ['itens'],
    });

    if (!carrinho) throw new NotFoundException('Carrinho não encontrado');

    const produto = await this.produtoRepository.findOne({
      where: { id: dto.produtoId },
    });

    if (!produto) throw new NotFoundException('Produto não encontrado');

    const precoTotal = produto.preco * dto.quantidade;

    const item = this.itemRepository.create({
      carrinho,
      produto,
      quantidade: dto.quantidade,
      precoTotal,
    });

    await this.itemRepository.save(item);

    const valorTotal = await this.calcularTotal(carrinho.id);
    carrinho.valorTotal = valorTotal;
    await this.carrinhoRepository.save(carrinho);

    return item;
  }

  async findAll() {
    return this.carrinhoRepository.find({ relations: ['cliente', 'itens', 'itens.produto'] });
  }

  async findOne(id: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!carrinho) {
      throw new NotFoundException(`Carrinho com id ${id} não encontrado`);
    }
    return carrinho;
  }

  async removerItemPorProdutoId(carrinhoId: number, produtoId: number): Promise<string> {
    const item = await this.itemRepository.findOne({
      where: {
        carrinho: { id: carrinhoId },
        produto: { id: produtoId },
      },
    });

    if (!item) {
      throw new NotFoundException('Item com esse produto não foi encontrado no carrinho.');
    }

    await this.itemRepository.remove(item);

    const valorTotal = await this.calcularTotal(carrinhoId);
    await this.carrinhoRepository.update(carrinhoId, { valorTotal });

    return 'Item removido com sucesso.';
  }

  async update(id: number, dto: Partial<CreateCarrinhoDto>) {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item do carrinho não encontrado');

    if (dto.quantidade !== undefined) {
      item.quantidade = dto.quantidade;

      const produto = await this.produtoRepository.findOne({ where: { id: item.produto.id } });
      if (!produto) throw new NotFoundException('Produto não encontrado');
      item.precoTotal = produto.preco * item.quantidade;
    }

    await this.itemRepository.save(item);

    const valorTotal = await this.calcularTotal(item.carrinho.id);
    await this.carrinhoRepository.update(item.carrinho.id, { valorTotal });

    return item;
  }

  async remove(id: number) {
    const carrinho = await this.carrinhoRepository.findOne({ where: { id }, relations: ['itens'] });
    if (!carrinho) throw new NotFoundException('Carrinho não encontrado');

    if (carrinho.itens.length > 0) {
      await this.itemRepository.remove(carrinho.itens);
    }

    await this.carrinhoRepository.remove(carrinho);
    return { message: 'Carrinho removido com sucesso' };
  }
}
