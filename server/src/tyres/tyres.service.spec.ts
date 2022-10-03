import { Test, TestingModule } from '@nestjs/testing';
import { TyresService } from './tyres.service';

describe('TyresService', () => {
  let service: TyresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TyresService],
    }).compile();

    service = module.get<TyresService>(TyresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
