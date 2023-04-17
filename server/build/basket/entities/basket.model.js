var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasOne, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { Customer } from '../../customers/entities/customer.model';
import { Users } from '../../users/entities/users.model';
let Basket = class Basket extends Model {
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
], Basket.prototype, "id_basket", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Basket.prototype, "id_cat", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Basket.prototype, "id_goods", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Basket.prototype, "goods", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Basket.prototype, "quantity", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Basket.prototype, "price", void 0);
__decorate([
    Column({
        type: DataType.BIGINT,
        unique: false,
        allowNull: false,
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        },
    }),
    __metadata("design:type", Number)
], Basket.prototype, "total", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Basket.prototype, "notes", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Basket.prototype, "id_user", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Basket.prototype, "id_customer", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], Basket.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Customer, 'id_customer'),
    __metadata("design:type", Customer)
], Basket.prototype, "customer", void 0);
__decorate([
    HasOne(() => Orders, 'id_basket'),
    __metadata("design:type", Orders)
], Basket.prototype, "order", void 0);
Basket = __decorate([
    Table({ tableName: 'basket' })
], Basket);
export { Basket };
