var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, BelongsTo, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Sales } from "./sale.model";
let SaleStorage = class SaleStorage extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id_sales_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "quantity", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.BIGINT, unique: false, allowNull: false,
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        }
    }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "total", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id_supplier", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id_order", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "sale_index", void 0);
__decorate([
    ForeignKey(() => Sales),
    Column({ type: DataType.BIGINT, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id_sale", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "storage_index", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.BIGINT, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], SaleStorage.prototype, "id_storage", void 0);
__decorate([
    BelongsTo(() => Sales, 'id_sale'),
    __metadata("design:type", Sales)
], SaleStorage.prototype, "sale", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], SaleStorage.prototype, "storage", void 0);
SaleStorage = __decorate([
    Table({ tableName: 'sales_storage', createdAt: false, updatedAt: false })
], SaleStorage);
export { SaleStorage };
