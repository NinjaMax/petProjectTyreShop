import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { UsersModule } from '../users/users.module';
import { TyresModule } from '../tyres/tyres.module';
import { PropertiesModule } from '../properties/properties.module';
import { CustomersModule } from '../customers/customers.module';
import { WheelsModule } from '../wheels/wheels.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    SequelizeModule.forFeature([Question]),
    TyresModule,
    WheelsModule,
    UsersModule,
    PropertiesModule,
    CustomersModule,
  ],
  exports: [QuestionsService],
})
export class QuestionsModule {}
