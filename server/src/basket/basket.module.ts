import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities/basket.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
  SequelizeModule.forFeature([Basket]),
  AuthModule
  ],
  exports: [BasketService],
})
export class BasketModule {}
