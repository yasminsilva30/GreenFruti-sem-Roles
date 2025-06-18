/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DonoLojaService } from './dono-loja.service';

describe('DonoLojaService', () => {
  let service: DonoLojaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonoLojaService],
    }).compile();

    service = module.get<DonoLojaService>(DonoLojaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
