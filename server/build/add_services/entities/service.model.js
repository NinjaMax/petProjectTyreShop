var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Sales } from "../../sales/entities/sale.model";
import { Orders } from '../../orders/entities/order.model';
let Service = class Service extends Model {
};
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Service.prototype, "id_service", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Service.prototype, "service", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Service.prototype, "notes", void 0);
__decorate([
    HasMany(() => Orders, 'id_basket'),
    __metadata("design:type", Array)
], Service.prototype, "orders", void 0);
__decorate([
    HasMany(() => Sales, 'id_basket'),
    __metadata("design:type", Array)
], Service.prototype, "sales", void 0);
Service = __decorate([
    Table({ tableName: 'service', createdAt: false, updatedAt: false })
], Service);
export { Service };
