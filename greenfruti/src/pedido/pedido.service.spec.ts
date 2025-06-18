/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedido.service';

describe('PedidoService', () => {
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
