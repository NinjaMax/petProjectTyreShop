var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { OrdersSupStorage } from "../../orders-suppliers/entities/orders-sup-storage.model";
import { Order_Storage } from "../../orders/entities/order-storage.model";
import { PriceBatteries } from "../../prices/entities/price-battery.model";
import { PriceOil } from "../../prices/entities/price-oils.model";
import { PriceTyres } from "../../prices/entities/price-tyres.model";
import { PriceWheels } from "../../prices/entities/price-wheels.model";
import { Sales } from "../../sales/entities/sale.model";
import { SaleStorage } from "../../sales/entities/sales-storage.model";
import { StockBatteries } from "../../stock/entities/stock-batteries.model";
import { StockOils } from "../../stock/entities/stock-oils.model";
import { StockTyres } from "../../stock/entities/stock-tyres.model";
import { StockWheels } from "../../stock/entities/stock-wheels.model";
let Storage = class Storage extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: false }),
    __metadata("design:type", Number)
], Storage.prototype, "id_storage", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Storage.prototype, "storage", void 0);
__decorate([
    HasMany(() => OrdersSupStorage, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "order_sup_storage", void 0);
__decorate([
    HasMany(() => StockTyres, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "stock_tyres", void 0);
__decorate([
    HasMany(() => PriceTyres, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "price_tyres", void 0);
__decorate([
    HasMany(() => StockWheels, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "stock_wheels", void 0);
__decorate([
    HasMany(() => PriceWheels, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "price_wheels", void 0);
__decorate([
    HasMany(() => StockBatteries, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "stock_batteries", void 0);
__decorate([
    HasMany(() => PriceBatteries, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "price_batteries", void 0);
__decorate([
    HasMany(() => StockOils, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "stock_oils", void 0);
__decorate([
    HasMany(() => PriceOil, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "price_oils", void 0);
__decorate([
    HasMany(() => Order_Storage, 'id_storage'),
    __metadata("design:type", Array)
], Storage.prototype, "order_storage", void 0);
__decorate([
    BelongsToMany(() => Sales, () => SaleStorage),
    __metadata("design:type", Array)
], Storage.prototype, "sales", void 0);
Storage = __decorate([
    Table({ tableName: 'storage', createdAt: false, updatedAt: false })
], Storage);
export { Storage };
