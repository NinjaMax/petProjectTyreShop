var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";
import { Wheel } from "../../wheels/entities/wheel.model";
let StockWheels = class StockWheels extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], StockWheels.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Wheel),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockWheels.prototype, "id_wheel", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], StockWheels.prototype, "stock", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0,
    }),
    __metadata("design:type", Number)
], StockWheels.prototype, "reserve", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], StockWheels.prototype, "remainder", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockWheels.prototype, "id_supplier", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockWheels.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: false }),
    __metadata("design:type", Date)
], StockWheels.prototype, "update_date", void 0);
__decorate([
    BelongsTo(() => Wheel, 'id_wheel'),
    __metadata("design:type", Wheel)
], StockWheels.prototype, "wheel", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], StockWheels.prototype, "supplier", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], StockWheels.prototype, "storage", void 0);
StockWheels = __decorate([
    Table({ tableName: 'stock_wheel', createdAt: false, updatedAt: false })
], StockWheels);
export { StockWheels };
