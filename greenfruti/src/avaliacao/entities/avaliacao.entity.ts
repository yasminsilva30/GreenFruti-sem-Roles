/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.avaliacoes, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Loja, (loja) => loja.avaliacoes)
  loja: Loja;

  @ManyToOne(() => Motoboy, (motoboy) => motoboy.avaliacoes, { nullable: true, eager: true })
  motoboy?: Motoboy;

  @Column()
  nota: number;

  @Column({ nullable: true })
  comentario?: string;
}