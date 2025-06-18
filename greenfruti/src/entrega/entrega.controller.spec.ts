/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EntregaController } from './entrega.controller';
import { EntregaService } from './entrega.service';

describe('EntregaController', () => {
  let controller: EntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregaController],
      providers: [EntregaService],
    }).compile();

    controller = module.get<EntregaController>(EntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
