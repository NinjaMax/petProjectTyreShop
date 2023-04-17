var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import { Storage } from '../../storage/entities/storage.model';
import { Orders } from './order.model';
let Order_Storage = class Order_Storage extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "id_order_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Order_Storage.prototype, "full_name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Order_Storage.prototype, "category", void 0);
__decorate([
    ForeignKey(() => Orders),
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "id_order", void 0);
__decorate([
    ForeignKey(() => Storage),
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "id_supplier", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "order_index", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "storage_index", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "quantity", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0, }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "reserve", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0, }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "price", void 0);
__decorate([
    Column({
        type: DataType.BIGINT,
        unique: false,
        allowNull: true,
        get() {
            const getTotal = this.getDataValue('price') * this.getDataValue('quantity');
            return getTotal;
        },
        set(getTotal) {
            this.setDataValue('total', getTotal);
        },
    }),
    __metadata("design:type", Number)
], Order_Storage.prototype, "total", void 0);
__decorate([
    BelongsTo(() => Orders, 'id_order'),
    __metadata("design:type", Orders)
], Order_Storage.prototype, "order", void 0);
__decorate([
    BelongsTo(() => Storage, 'id_storage'),
    __metadata("design:type", Storage)
], Order_Storage.prototype, "storage", void 0);
Order_Storage = __decorate([
    Table({ tableName: 'order_storage', createdAt: false, updatedAt: false })
], Order_Storage);
export { Order_Storage };
