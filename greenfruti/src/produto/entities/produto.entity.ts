/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { CarrinhoItem } from 'src/carrinho/entities/carrinho.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  categoria: string;

  @ManyToOne(() => Loja, (loja) => loja.produtos)
  loja: Loja;

  @OneToMany(() => CarrinhoItem, (item) => item.produto)
  carrinhoItens: CarrinhoItem[];

  @OneToMany(() => Estoque, (estoque) => estoque.produto)
  estoques: Estoque[];
}

