/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonoLoja } from './entities/dono-loja.entity';
import { DonoLojaService } from './dono-loja.service';
import { DonoLojaController } from './dono-loja.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DonoLoja])],
  controllers: [DonoLojaController],
  providers: [DonoLojaService],
  exports: [TypeOrmModule],
})
export class DonoLojaModule {}
