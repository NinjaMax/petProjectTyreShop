var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasMany, HasOne, } from 'sequelize-typescript';
import { Basket } from '../../basket/entities/basket.model';
import { Contract } from '../../contract/entities/contract.model';
import { Orders } from '../../orders/entities/order.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
let Customer = class Customer extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "id_customer", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "full_name", void 0);
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Customer.prototype, "phone", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "adress", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "delivery", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "token", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'customer',
    }),
    __metadata("design:type", String)
], Customer.prototype, "role", void 0);
__decorate([
    HasMany(() => ReviewTyres, 'id_customer'),
    __metadata("design:type", Array)
], Customer.prototype, "reviews", void 0);
__decorate([
    HasOne(() => Basket, 'id_customer'),
    __metadata("design:type", Basket)
], Customer.prototype, "basket", void 0);
__decorate([
    HasMany(() => Orders, 'id_customer'),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
__decorate([
    HasMany(() => Contract, 'id_customer'),
    __metadata("design:type", Array)
], Customer.prototype, "contract", void 0);
Customer = __decorate([
    Table({ tableName: 'customer', createdAt: false, updatedAt: false })
], Customer);
export { Customer };
