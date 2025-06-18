/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MotoboysController } from './motoboy.controller';
import { MotoboysService } from './motoboy.service';

describe('MotoboyController', () => {
  let controller: MotoboysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoboysController],
      providers: [MotoboysService],
    }).compile();

    controller = module.get<MotoboysController>(MotoboysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
