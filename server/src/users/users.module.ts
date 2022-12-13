import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { Users } from './entities/users.model';
import { ContractModule } from 'src/contract/contract.module';
import { Contract } from 'src/contract/entities/contract.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
  imports: [ 
    SequelizeModule.forFeature([Users, ReviewTyres, Contract]),
    ReviewsModule, ContractModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
