var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Sales } from '../../sales/entities/sale.model';
import { Users } from '../../users/entities/users.model';
let Comments = class Comments extends Model {
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
], Comments.prototype, "id_comment", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Comments.prototype, "comments", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Comments.prototype, "id_user", void 0);
__decorate([
    ForeignKey(() => Orders),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Comments.prototype, "id_order", void 0);
__decorate([
    ForeignKey(() => OrdersSupplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Comments.prototype, "id_order_sup", void 0);
__decorate([
    ForeignKey(() => Sales),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Comments.prototype, "id_sale", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], Comments.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Orders, 'id_order'),
    __metadata("design:type", Orders)
], Comments.prototype, "order", void 0);
__decorate([
    BelongsTo(() => OrdersSupplier, 'id_order_sup'),
    __metadata("design:type", OrdersSupplier)
], Comments.prototype, "order_sup", void 0);
__decorate([
    BelongsTo(() => Sales, 'id_sales'),
    __metadata("design:type", Sales)
], Comments.prototype, "sales", void 0);
Comments = __decorate([
    Table({ tableName: 'comment' })
], Comments);
export { Comments };
