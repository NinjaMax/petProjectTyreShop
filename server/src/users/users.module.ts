import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { Users } from './entities/users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
  imports: [ 
    SequelizeModule.forFeature([Users, ReviewTyres]),
    ReviewsModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
