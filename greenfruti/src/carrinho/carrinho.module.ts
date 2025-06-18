/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho, CarrinhoItem } from './entities/carrinho.entity';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrinho, CarrinhoItem, Cliente, Produto]),
  ],
  providers: [CarrinhoService],
  controllers: [CarrinhoController],
  exports: [CarrinhoService],
})
export class CarrinhoModule {}
