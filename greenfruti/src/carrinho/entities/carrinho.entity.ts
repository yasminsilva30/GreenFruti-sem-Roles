/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';

@Entity()
export class Carrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.carrinhos, { eager: true })
  @JoinColumn()
  cliente: Cliente;

  @OneToMany(() => CarrinhoItem, (item) => item.carrinho, { cascade: true, eager: true })
  itens: CarrinhoItem[];

  @OneToOne(() => Pagamento, (pagamento) => pagamento.carrinho, { nullable: true })
  @JoinColumn()
  pagamento: Pagamento;

  @ManyToOne(() => Pedido, (pedido) => pedido.carrinhos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  pedido: Pedido;  

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valorTotal: number;

}

@Entity()
export class CarrinhoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrinho, (carrinho) => carrinho.itens)
  carrinho: Carrinho;

  @ManyToOne(() => Produto, (produto) => produto.carrinhoItens, { eager: true })
  @JoinColumn()
  produto: Produto;

  @Column('int')
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precoTotal: number;
}
