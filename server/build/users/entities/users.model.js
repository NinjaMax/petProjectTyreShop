var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasMany, HasOne } from "sequelize-typescript";
import { ReviewTyres } from "../../reviews/entities/review-tyres.model";
import { Orders } from "../../orders/entities/order.model";
import { Basket } from "../../basket/entities/basket.model";
import { Comments } from "../../comments/entities/comment.model";
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Contract } from '../../contract/entities/contract.model';
let Users = class Users extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Users.prototype, "id_user", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Users.prototype, "full_name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Users.prototype, "delivery", void 0);
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Users.prototype, "phone", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Users.prototype, "token", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false, defaultValue: 'customer' }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    HasMany(() => ReviewTyres, 'id_user'),
    __metadata("design:type", Array)
], Users.prototype, "reviews", void 0);
__decorate([
    HasOne(() => Basket, 'id_user'),
    __metadata("design:type", Basket)
], Users.prototype, "basket", void 0);
__decorate([
    HasMany(() => Orders, 'id_user'),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    HasMany(() => Comments, 'id_user'),
    __metadata("design:type", Array)
], Users.prototype, "comments", void 0);
__decorate([
    HasMany(() => OrdersSupplier, 'id_user'),
    __metadata("design:type", Array)
], Users.prototype, "orders_sup", void 0);
__decorate([
    HasMany(() => Contract, 'id_user'),
    __metadata("design:type", Array)
], Users.prototype, "contract", void 0);
Users = __decorate([
    Table({ tableName: 'user', createdAt: false, updatedAt: false })
], Users);
export { Users };
