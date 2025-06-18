/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosController } from './pagamento.controller';
import { PagamentosService } from './pagamento.service';

describe('PagamentoController', () => {
  let controller: PagamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentosController],
      providers: [PagamentosService],
    }).compile();

    controller = module.get<PagamentosController>(PagamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
