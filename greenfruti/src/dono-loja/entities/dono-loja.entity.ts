/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loja } from 'src/loja/entities/loja.entity';

@Entity()
export class DonoLoja {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  nome: string;

  @Column()
  @Expose()
  cpf: string;

  @ManyToOne(() => Loja, (loja) => loja.donoLoja)
  loja: Loja;

}
