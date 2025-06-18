/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { ClientesController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], 
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [TypeOrmModule.forFeature([Cliente])]
})
export class ClienteModule {}
