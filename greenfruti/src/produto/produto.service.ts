import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,

    @InjectRepository(Loja)
    private lojaRepo: Repository<Loja>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const { nome, preco, categoria, lojaId } = createProdutoDto;

    const loja = await this.lojaRepo.findOne({ where: { id: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${lojaId} não encontrada`);
    }

    const produto = this.produtoRepo.create({
      nome,
      preco,
      categoria,
      loja,
    });

    return this.produtoRepo.save(produto);
  }

  findAll(categoria?: string) {
    if (categoria) {
      return this.produtoRepo.find({
        where: { categoria },
        relations: ['loja'],
      });
    }
    return this.produtoRepo.find({ relations: ['loja'] });
  }

  findOne(id: number) {
    return this.produtoRepo.findOne({ where: { id }, relations: ['loja'] });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepo.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    Object.assign(produto, updateProdutoDto);
    return this.produtoRepo.save(produto);
  }

  async remove(id: number) {
    const produto = await this.produtoRepo.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return this.produtoRepo.remove(produto);
  }
}
