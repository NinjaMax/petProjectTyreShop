var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from './entities/comment.model';
import { AuthModule } from '../auth/auth.module';
import { OrdersSuppliersModule } from '../orders-suppliers/orders-suppliers.module';
import { OrdersModule } from '../orders/orders.module';
import { UsersModule } from '../users/users.module';
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    Module({
        controllers: [CommentsController],
        providers: [CommentsService],
        imports: [
            SequelizeModule.forFeature([Comments]),
            forwardRef(() => OrdersModule),
            OrdersSuppliersModule, UsersModule, AuthModule
        ],
        exports: [CommentsService]
    })
], CommentsModule);
export { CommentsModule };
