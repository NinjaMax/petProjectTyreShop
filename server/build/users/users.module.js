var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    Module({
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
], UsersModule);
export { UsersModule };
