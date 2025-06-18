/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentosService } from './pagamento.service';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { CarrinhoModule } from 'src/carrinho/carrinho.module';
import { PagamentosController } from './pagamento.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento, Pedido, Carrinho]),
    CarrinhoModule,
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentoModule {}
