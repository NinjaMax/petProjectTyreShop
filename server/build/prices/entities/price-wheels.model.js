var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";
import { Wheel } from "../../wheels/entities/wheel.model";
let PriceWheels = class PriceWheels extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Wheel),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "id_wheel", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "price_wholesale", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "price", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "id_supplier", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "delivery_price", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceWheels.prototype, "price_plus_delivery", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: false }),
    __metadata("design:type", Date)
], PriceWheels.prototype, "update_date", void 0);
__decorate([
    BelongsTo(() => Wheel, 'id_wheel'),
    __metadata("design:type", Wheel)
], PriceWheels.prototype, "wheel", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], PriceWheels.prototype, "supplier", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], PriceWheels.prototype, "storage", void 0);
PriceWheels = __decorate([
    Table({ tableName: 'price_wheel', createdAt: false, updatedAt: false })
], PriceWheels);
export { PriceWheels };
