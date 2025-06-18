/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity'

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column()
  status: string;

  @ManyToOne(() => Carrinho, (carrinho) => carrinho.pagamento, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  carrinho: Carrinho;
  
  @OneToOne(() => Pedido, (pedido) => pedido.pagamento, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  pedido: Pedido;
  
  @OneToOne(() => Entrega, (entrega) => entrega.pagamento, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  entrega: Entrega;  

}
