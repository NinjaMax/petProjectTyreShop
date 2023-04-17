var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { StockTyres } from '../../stock/entities/stock-tyres.model';
import { Contract } from '../../contract/entities/contract.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { PriceBatteries } from '../../prices/entities/price-battery.model';
import { PriceOil } from '../../prices/entities/price-oils.model';
import { PriceTyres } from '../../prices/entities/price-tyres.model';
import { PriceWheels } from '../../prices/entities/price-wheels.model';
import { StockBatteries } from '../../stock/entities/stock-batteries.model';
import { StockOils } from '../../stock/entities/stock-oils.model';
import { StockWheels } from '../../stock/entities/stock-wheels.model';
let Supplier = class Supplier extends Model {
};
__decorate([
    Column({
        type: DataType.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
    }),
    __metadata("design:type", Number)
], Supplier.prototype, "id_supplier", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Supplier.prototype, "city", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Supplier.prototype, "city_ua", void 0);
__decorate([
    Column({ type: DataType.BIGINT, unique: false, allowNull: true }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Supplier.prototype, "phone", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", Array)
], Supplier.prototype, "delivery", void 0);
__decorate([
    HasMany(() => StockTyres, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "stock_tyres", void 0);
__decorate([
    HasMany(() => StockWheels, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "stock_wheels", void 0);
__decorate([
    HasMany(() => StockBatteries, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "stock_batteries", void 0);
__decorate([
    HasMany(() => StockOils, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "stock_oils", void 0);
__decorate([
    HasMany(() => PriceTyres, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "price_tyres", void 0);
__decorate([
    HasMany(() => PriceWheels, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "price_wheels", void 0);
__decorate([
    HasMany(() => PriceBatteries, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "price_batteries", void 0);
__decorate([
    HasMany(() => PriceOil, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "price_oils", void 0);
__decorate([
    HasMany(() => OrdersSupplier, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "orders_sup", void 0);
__decorate([
    HasMany(() => Contract, 'id_supplier'),
    __metadata("design:type", Array)
], Supplier.prototype, "contract", void 0);
Supplier = __decorate([
    Table({ tableName: 'suppliers', updatedAt: false })
], Supplier);
export { Supplier };
