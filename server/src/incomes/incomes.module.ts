import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { Incomes } from './entities/income.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports: [ 
    SequelizeModule.forFeature([Incomes]),
    AuthModule
  ],
  exports: [IncomesService]
})
export class IncomesModule {}
