/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoboysService } from './motoboy.service';
import { MotoboysController } from './motoboy.controller';
import { Motoboy } from './entities/motoboy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motoboy])], 
  controllers: [MotoboysController],
  providers: [MotoboysService],
  exports: [MotoboysService],
})
export class MotoboyModule {}
