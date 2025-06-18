/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao, Cliente, Loja, Motoboy]),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
})
export class AvaliacaoModule {}
