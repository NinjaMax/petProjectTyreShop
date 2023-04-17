var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Category } from "../../categorys/entities/category.model";
import { PriceOil } from "../../prices/entities/price-oils.model";
import { StockOils } from "../../stock/entities/stock-oils.model";
let Oil = class Oil extends Model {
};
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement: false }),
    __metadata("design:type", Number)
], Oil.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Oil.prototype, "full_name", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Oil.prototype, "id_cat", void 0);
__decorate([
    BelongsTo(() => Category, 'id_cat'),
    __metadata("design:type", Category)
], Oil.prototype, "category", void 0);
__decorate([
    HasMany(() => PriceOil, 'id_oil'),
    __metadata("design:type", Array)
], Oil.prototype, "price", void 0);
__decorate([
    HasMany(() => StockOils, 'id_oil'),
    __metadata("design:type", Array)
], Oil.prototype, "stock", void 0);
Oil = __decorate([
    Table({ tableName: 'oil', createdAt: false })
], Oil);
export { Oil };
