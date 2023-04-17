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
import { Storage } from "../../storage/entities/storage.model";
import { OrdersSupplier } from "./orders-supplier.model";
let OrdersSupStorage = class OrdersSupStorage extends Model {
};
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id_order_sup_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "quantity", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "price_wholesale", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.BIGINT, unique: false, allowNull: true,
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        }
    }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "total", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], OrdersSupStorage.prototype, "notes", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id_supplier", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "storage_index", void 0);
__decorate([
    ForeignKey(() => OrdersSupplier),
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id_order_sup", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "order_sup_index", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OrdersSupStorage.prototype, "id_order", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], OrdersSupStorage.prototype, "storage", void 0);
__decorate([
    BelongsTo(() => OrdersSupplier, 'id_order_sup'),
    __metadata("design:type", OrdersSupplier)
], OrdersSupStorage.prototype, "order_sup", void 0);
OrdersSupStorage = __decorate([
    Table({ tableName: 'order_sup_storage' })
], OrdersSupStorage);
export { OrdersSupStorage };
