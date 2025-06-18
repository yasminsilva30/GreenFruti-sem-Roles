/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutosService } from './produto.service';
import { ProdutosController } from './produto.controller';
import { Loja } from 'src/loja/entities/loja.entity';
import { LojaModule } from 'src/loja/loja.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto, Loja]),
    LojaModule,
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
