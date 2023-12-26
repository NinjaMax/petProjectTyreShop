import { Test, TestingModule } from '@nestjs/testing';
import { SmsFlyApiController } from './sms-fly-api.controller';
import { SmsFlyApiService } from './sms-fly-api.service';

describe('SmsFlyApiController', () => {
  let controller: SmsFlyApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsFlyApiController],
      providers: [SmsFlyApiService],
    }).compile();

    controller = module.get<SmsFlyApiController>(SmsFlyApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
