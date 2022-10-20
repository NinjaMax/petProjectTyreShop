import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
  imports: [ 
    SequelizeModule.forFeature([ReviewTyres]),
    ReviewsModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
