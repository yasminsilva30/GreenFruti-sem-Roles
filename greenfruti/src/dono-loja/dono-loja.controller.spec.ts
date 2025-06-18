/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DonoLojaController } from './dono-loja.controller';
import { DonoLojaService } from './dono-loja.service';

describe('DonoLojaController', () => {
  let controller: DonoLojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonoLojaController],
      providers: [DonoLojaService],
    }).compile();

    controller = module.get<DonoLojaController>(DonoLojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
