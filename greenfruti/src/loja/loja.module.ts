/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojasService } from './loja.service';
import { LojaController } from './loja.controller';
import { Loja } from './entities/loja.entity';
import { DonoLoja } from 'src/dono-loja/entities/dono-loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja, DonoLoja])],
  providers: [LojasService],
  controllers: [LojaController],
  exports: [TypeOrmModule],
})
export class LojaModule {}
