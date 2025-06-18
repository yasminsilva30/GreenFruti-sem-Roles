import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Cliente } from './cliente/entities/cliente.entity';
import { Loja } from './loja/entities/loja.entity';
import { Produto } from './produto/entities/produto.entity';
import { Motoboy } from './motoboy/entities/motoboy.entity';
import { DonoLoja } from './dono-loja/entities/dono-loja.entity';
import { Pedido } from './pedido/entities/pedido.entity';
import { Pagamento } from './pagamento/entities/pagamento.entity';
import { Estoque } from './estoque/entities/estoque.entity';
import { Entrega } from './entrega/entities/entrega.entity';
import { Avaliacao } from './avaliacao/entities/avaliacao.entity';
import { Carrinho, CarrinhoItem } from './carrinho/entities/carrinho.entity';
import { Endereco } from './endereco/entities/endereco.entity';

import { ClienteModule } from './cliente/cliente.module';
import { LojaModule } from './loja/loja.module';
import { ProdutoModule } from './produto/produto.module';
import { MotoboyModule } from './motoboy/motoboy.module';
import { DonoLojaModule } from './dono-loja/dono-loja.module';
import { PedidoModule } from './pedido/pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { EstoquesModule } from './estoque/estoque.module';
import { EntregaModule } from './entrega/entrega.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { EnderecoModule } from './endereco/endereco.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        Cliente,
        Loja,
        Produto,
        Motoboy,
        DonoLoja,
        Pedido,
        Pagamento,
        Estoque,
        Entrega,
        Avaliacao,
        Carrinho,
        CarrinhoItem,
        Endereco
      ],
      synchronize: true,
    }),

    ClienteModule,
    LojaModule,
    ProdutoModule,
    MotoboyModule,
    DonoLojaModule,
    PedidoModule,
    PagamentoModule,
    EstoquesModule,
    EntregaModule,
    AvaliacaoModule,
    CarrinhoModule,
    EnderecoModule
  ],
})
export class AppModule {}
