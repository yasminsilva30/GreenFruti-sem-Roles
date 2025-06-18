/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedido.controller';
import { PedidosService } from './pedido.service';

describe('PedidoController', () => {
  let controller: PedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [PedidosService],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
