/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstoquesController } from './estoque.controller';
import { EstoquesService } from './estoque.service';

describe('EstoqueController', () => {
  let controller: EstoquesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoquesController],
      providers: [EstoquesService],
    }).compile();

    controller = module.get<EstoquesController>(EstoquesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
