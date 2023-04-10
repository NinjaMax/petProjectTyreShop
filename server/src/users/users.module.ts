import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { Users } from './entities/users.model';
import { ContractModule } from 'src/contract/contract.module';
import { Contract } from 'src/contract/entities/contract.model';
import { AuthModule } from 'src/auth/auth.module';

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
