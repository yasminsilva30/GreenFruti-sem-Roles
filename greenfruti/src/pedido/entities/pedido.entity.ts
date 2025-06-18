import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'Pedido pendente' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @OneToOne(() => Pagamento, (pagamento) => pagamento.pedido)
  @JoinColumn()
  pagamento: Pagamento;

  @OneToOne(() => Entrega, (entrega) => entrega.pedido)
  @JoinColumn()
  entrega: Entrega;

  @OneToMany(() => Carrinho, (carrinho) => carrinho.pedido)
  carrinhos: Carrinho[];

}
