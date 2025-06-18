/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoquesService } from './estoque.service';
import { EstoquesController } from './estoque.controller';
import { Estoque } from './entities/estoque.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estoque, Produto, Loja]),
    ProdutoModule,
  ],
  controllers: [EstoquesController],
  providers: [EstoquesService],
})
export class EstoquesModule {}
