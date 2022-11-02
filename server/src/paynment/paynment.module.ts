import { Module } from '@nestjs/common';
import { PaynmentService } from './paynment.service';
import { PaynmentController } from './paynment.controller';

@Module({
  controllers: [PaynmentController],
  providers: [PaynmentService]
})
export class PaynmentModule {}
