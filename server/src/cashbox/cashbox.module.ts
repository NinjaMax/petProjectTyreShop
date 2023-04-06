import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CashboxService } from './cashbox.service';
import { CashboxController } from './cashbox.controller';
import { Cashbox } from './entities/cashbox.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CashboxController],
  providers: [CashboxService], 
  imports: [ 
    SequelizeModule.forFeature([Cashbox]),
    AuthModule
  ],
  exports: [CashboxService]
})
export class CashboxModule {}
