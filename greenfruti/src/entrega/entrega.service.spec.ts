/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EntregaService } from './entrega.service';

describe('EntregaService', () => {
  let service: EntregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregaService],
    }).compile();

    service = module.get<EntregaService>(EntregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
