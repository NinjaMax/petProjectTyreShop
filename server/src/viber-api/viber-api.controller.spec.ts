import { Test, TestingModule } from '@nestjs/testing';
import { ViberApiController } from './viber-api.controller';
import { ViberApiService } from './viber-api.service';

describe('ViberApiController', () => {
  let controller: ViberApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViberApiController],
      providers: [ViberApiService],
    }).compile();

    controller = module.get<ViberApiController>(ViberApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
