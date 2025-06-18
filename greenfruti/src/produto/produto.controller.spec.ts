/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produto.controller';
import { ProdutosService } from './produto.service';

describe('ProdutoController', () => {
  let controller: ProdutosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [ProdutosService],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
