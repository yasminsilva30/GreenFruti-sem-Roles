/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produto } from 'src/produto/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => Produto, (produto) => produto.estoques)
  produto: Produto;

  @ManyToOne(() => Loja, (loja) => loja.estoques)
  loja: Loja;
}
