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
import { Oil } from "../../oils/entities/oil.model";
import { Storage } from "../../storage/entities/storage.model";
let StockOils = class StockOils extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true }),
    __metadata("design:type", Number)
], StockOils.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Oil),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockOils.prototype, "id_oil", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], StockOils.prototype, "stock", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0,
        set() {
            const getRemainder = this.getDataValue('stock') - this.getDataValue('reserve');
            const getReserve = this.getDataValue('stock') - this.getDataValue('remainder');
            if (getRemainder < 0) {
                this.setDataValue('reserve', getReserve - getRemainder);
                this.setDataValue('remainder', 0);
                return `You can not set more "reserve" because does not have remainder. "Remainder 0".`;
            }
            else {
                this.setDataValue('remainder', getRemainder);
            }
        }
    }),
    __metadata("design:type", Number)
], StockOils.prototype, "reserve", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], StockOils.prototype, "remainder", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockOils.prototype, "id_supplier", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], StockOils.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: false }),
    __metadata("design:type", Date)
], StockOils.prototype, "update_date", void 0);
__decorate([
    BelongsTo(() => Oil, 'id_oil'),
    __metadata("design:type", Oil)
], StockOils.prototype, "oil", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], StockOils.prototype, "supplier", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], StockOils.prototype, "storage", void 0);
StockOils = __decorate([
    Table({ tableName: 'stock_oil', createdAt: false, updatedAt: false })
], StockOils);
export { StockOils };