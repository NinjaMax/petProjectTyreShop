import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { ReviewsModule } from '../reviews/reviews.module';
import { Users } from './entities/users.model';
import { ContractModule } from '../contract/contract.module';
import { Contract } from '../contract/entities/contract.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
  imports: [ 
    SequelizeModule.forFeature([Users, ReviewTyres, Contract]),
    forwardRef(() => ReviewsModule),
    forwardRef(() => ContractModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
