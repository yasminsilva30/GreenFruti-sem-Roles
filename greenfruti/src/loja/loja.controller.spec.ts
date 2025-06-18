/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LojaController } from './loja.controller';
import { LojasService } from './loja.service';

describe('LojaController', () => {
  let controller: LojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LojaController],
      providers: [LojasService],
    }).compile();

    controller = module.get<LojaController>(LojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
