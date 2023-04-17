var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { OrdersSupStorage } from "./orders-sup-storage.model";
import { Comments } from "../../comments/entities/comment.model";
import { Orders } from "../../orders/entities/order.model";
import { Paynment } from "../../paynment/entities/paynment.model";
import { Supplier } from "../../suppliers/entities/supplier.model";
import { Users } from "../../users/entities/users.model";
let OrdersSupplier = class OrdersSupplier extends Model {
};
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], OrdersSupplier.prototype, "id_order_sup", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], OrdersSupplier.prototype, "delivery", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true, defaultValue: 'NEW' }),
    __metadata("design:type", String)
], OrdersSupplier.prototype, "status", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], OrdersSupplier.prototype, "notes", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], OrdersSupplier.prototype, "id_user", void 0);
__decorate([
    ForeignKey(() => Orders),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], OrdersSupplier.prototype, "id_order", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], OrdersSupplier.prototype, "id_supplier", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], OrdersSupplier.prototype, "id_contract", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], OrdersSupplier.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Orders, 'id_order'),
    __metadata("design:type", Orders)
], OrdersSupplier.prototype, "order", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], OrdersSupplier.prototype, "supplier", void 0);
__decorate([
    HasMany(() => Comments, 'id_order_sup'),
    __metadata("design:type", Array)
], OrdersSupplier.prototype, "comments", void 0);
__decorate([
    HasMany(() => Paynment, 'id_order_sup'),
    __metadata("design:type", Array)
], OrdersSupplier.prototype, "paynment", void 0);
__decorate([
    HasMany(() => OrdersSupStorage, 'id_order_sup'),
    __metadata("design:type", Array)
], OrdersSupplier.prototype, "orders_sup_storage", void 0);
OrdersSupplier = __decorate([
    Table({ tableName: 'order_supplier' })
], OrdersSupplier);
export { OrdersSupplier };
