/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidosService } from './pedido.service';
import { PedidosController } from './pedido.controller';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Cliente, Pagamento, Entrega, Carrinho]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidoModule {}
