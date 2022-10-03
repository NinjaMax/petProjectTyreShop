import { Test, TestingModule } from '@nestjs/testing';
import { TyresController } from './tyres.controller';
import { TyresService } from './tyres.service';

describe('TyresController', () => {
  let controller: TyresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TyresController],
      providers: [TyresService],
    }).compile();

    controller = module.get<TyresController>(TyresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
