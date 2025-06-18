/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosService],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
