/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pedido, (pedido) => pedido.entrega)
  @JoinColumn()
  pedido: Pedido;

  @OneToOne(() => Pagamento, (pagamento) => pagamento.entrega, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  pagamento: Pagamento;  

  @ManyToOne(() => Motoboy, (motoboy) => motoboy.entregas)
  motoboy: Motoboy;

  @ManyToOne(() => Endereco, (endereco) => endereco.entregas, { eager: true })
  @JoinColumn({ name: 'enderecoId' })
  endereco: Endereco;

  @Column()
  status: string;

  @Column({ type: 'datetime' })
  dataEntrega: Date;
}
