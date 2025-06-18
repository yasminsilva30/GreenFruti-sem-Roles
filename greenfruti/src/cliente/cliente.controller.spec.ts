/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './cliente.controller';
import { ClientesService } from './cliente.service';

describe('ClienteController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
