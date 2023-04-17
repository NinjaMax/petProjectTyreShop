var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, } from 'sequelize-typescript';
import { Order_Storage } from './order-storage.model';
import { Basket } from '../../basket/entities/basket.model';
import { Comments } from '../../comments/entities/comment.model';
import { Customer } from '../../customers/entities/customer.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Paynment } from '../../paynment/entities/paynment.model';
import { Sales } from '../../sales/entities/sale.model';
import { Users } from '../../users/entities/users.model';
let Orders = class Orders extends Model {
};
__decorate([
    Column({
        type: DataType.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Orders.prototype, "id_order", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "organisation", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Orders.prototype, "storage", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "order_view", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "delivery", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "status_delivery", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Orders.prototype, "delivery_ttn", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "status", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "pay_view", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Orders.prototype, "status_pay", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Orders.prototype, "notes", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Orders.prototype, "dop_garanty", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Orders.prototype, "id_customer", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Orders.prototype, "id_contract", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Orders.prototype, "id_user", void 0);
__decorate([
    ForeignKey(() => Basket),
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Orders.prototype, "id_basket", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], Orders.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Customer, 'id_customer'),
    __metadata("design:type", Customer)
], Orders.prototype, "customer", void 0);
__decorate([
    BelongsTo(() => Basket, 'id_basket'),
    __metadata("design:type", Basket)
], Orders.prototype, "basket", void 0);
__decorate([
    HasMany(() => Comments, 'id_order'),
    __metadata("design:type", Array)
], Orders.prototype, "comments", void 0);
__decorate([
    HasMany(() => Order_Storage, 'id_order'),
    __metadata("design:type", Array)
], Orders.prototype, "order_storage", void 0);
__decorate([
    HasMany(() => OrdersSupplier, 'id_order'),
    __metadata("design:type", Array)
], Orders.prototype, "order_sup", void 0);
__decorate([
    HasMany(() => Paynment, 'id_order'),
    __metadata("design:type", Array)
], Orders.prototype, "paynment", void 0);
__decorate([
    HasMany(() => Sales, 'id_order'),
    __metadata("design:type", Array)
], Orders.prototype, "sales", void 0);
Orders = __decorate([
    Table({ tableName: 'order' })
], Orders);
export { Orders };
