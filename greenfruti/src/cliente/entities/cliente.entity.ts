/* eslint-disable prettier/prettier */ 

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @OneToMany(() => Endereco, (endereco) => endereco.cliente)
  enderecos: Endereco[];

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Carrinho, (carrinho) => carrinho.cliente)
  carrinhos: Carrinho[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.cliente)
  avaliacoes: Avaliacao[];
}
