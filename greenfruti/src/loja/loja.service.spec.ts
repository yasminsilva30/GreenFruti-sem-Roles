/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LojasService } from './loja.service';

describe('LojasService', () => {
  let service: LojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LojasService],
    }).compile();

    service = module.get<LojasService>(LojasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
