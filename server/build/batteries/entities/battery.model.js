var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, } from 'sequelize-typescript';
import { Category } from '../../categorys/entities/category.model';
import { PriceBatteries } from '../../prices/entities/price-battery.model';
import { StockBatteries } from '../../stock/entities/stock-batteries.model';
let Battery = class Battery extends Model {
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
], Battery.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Battery.prototype, "full_name", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Battery.prototype, "id_cat", void 0);
__decorate([
    BelongsTo(() => Category, 'id_cat'),
    __metadata("design:type", Category)
], Battery.prototype, "category", void 0);
__decorate([
    HasMany(() => PriceBatteries, 'id_battery'),
    __metadata("design:type", Array)
], Battery.prototype, "price", void 0);
__decorate([
    HasMany(() => StockBatteries, 'id_battery'),
    __metadata("design:type", Array)
], Battery.prototype, "stock", void 0);
Battery = __decorate([
    Table({ tableName: 'batterie', createdAt: false })
], Battery);
export { Battery };
