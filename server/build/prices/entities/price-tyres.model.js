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
import { Tyres } from "../../tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";
let PriceTyres = class PriceTyres extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Tyres),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "id_tyre", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "price_wholesale", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "price", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "id_supplier", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER, defaultValue: 1 }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "delivery_price", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], PriceTyres.prototype, "price_plus_delivery", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: false }),
    __metadata("design:type", Date)
], PriceTyres.prototype, "update_date", void 0);
__decorate([
    BelongsTo(() => Tyres, 'id_tyre'),
    __metadata("design:type", Tyres)
], PriceTyres.prototype, "tyres", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], PriceTyres.prototype, "supplier", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], PriceTyres.prototype, "storage", void 0);
PriceTyres = __decorate([
    Table({ tableName: 'price_tyres', createdAt: false, updatedAt: false })
], PriceTyres);
export { PriceTyres };
