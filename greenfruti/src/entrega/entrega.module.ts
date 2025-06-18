/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaController } from './entrega.controller';
import { EntregaService } from './entrega.service';
import { Entrega } from './entities/entrega.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Motoboy } from 'src/motoboy/entities/motoboy.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega, Pagamento, Motoboy, Endereco])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
