/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';

@Entity()
export class Motoboy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @OneToMany(() => Entrega, (entrega) => entrega.motoboy)
  entregas: Entrega[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.motoboy)
  avaliacoes: Avaliacao[];

}
