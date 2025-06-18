/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { Endereco } from './entities/endereco.entity';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco]), ClienteModule],
  providers: [EnderecoService],
  controllers: [EnderecoController],
})
export class EnderecoModule {}
