/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos, { eager: true })
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @OneToMany(() => Entrega, (entrega) => entrega.endereco)
  entregas: Entrega[];

}
