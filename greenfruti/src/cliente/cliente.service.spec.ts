/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
