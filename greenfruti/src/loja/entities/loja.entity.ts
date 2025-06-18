/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DonoLoja } from 'src/dono-loja/entities/dono-loja.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column('decimal', { precision: 10, scale: 2 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 2 })
  longitude: number;

  @ManyToOne(() => DonoLoja, (donoLoja) => donoLoja.loja, { eager: true }) 
  @JoinColumn({ name: 'dono_loja_id' }) 
  donoLoja: DonoLoja;

  @OneToMany(() => Estoque, (estoque) => estoque.loja)
  estoques: Estoque[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.loja)
  avaliacoes: Avaliacao[];

  @OneToMany(() => Produto, (produto) => produto.loja)
  produtos: Produto[];

}
