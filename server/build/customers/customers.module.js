var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.model';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
let CustomersModule = class CustomersModule {
};
CustomersModule = __decorate([
    Module({
        controllers: [CustomersController],
        providers: [CustomersService],
        imports: [
            SequelizeModule.forFeature([Customer]),
            forwardRef(() => ContractModule),
            forwardRef(() => AuthModule),
        ],
        exports: [CustomersService],
    })
], CustomersModule);
export { CustomersModule };
