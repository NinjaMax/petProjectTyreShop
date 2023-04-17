var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany, } from 'sequelize-typescript';
import { Category } from "../../categorys/entities/category.model";
import { PriceWheels } from "../../prices/entities/price-wheels.model";
import { WheelBoltCount } from "../../properties/entities/wheels/wheel-boltCount.model";
import { WheelBoltCountPcd } from "../../properties/entities/wheels/wheel-boltCountPcd.model";
import { WheelBrand } from "../../properties/entities/wheels/wheel-brand.model";
import { WheelColor } from "../../properties/entities/wheels/wheel-color.model";
import { WheelDia } from "../../properties/entities/wheels/wheel-dia.model";
import { WheelDiameter } from "../../properties/entities/wheels/wheel-diameter.model";
import { WheelEt } from "../../properties/entities/wheels/wheel-et.model";
import { WheelModel } from "../../properties/entities/wheels/wheel-model.model";
import { WheelPcd } from "../../properties/entities/wheels/wheel-pcd.model";
import { WheelPcd2 } from "../../properties/entities/wheels/wheel-pcd2.model";
import { WheelSizeDigits } from '../../properties/entities/wheels/wheel-sizeDigits.model';
import { WheelType } from '../../properties/entities/wheels/wheel-type.model';
import { WheelWidth } from '../../properties/entities/wheels/wheel-width.model';
import { StockWheels } from '../../stock/entities/stock-wheels.model';
let Wheel = class Wheel extends Model {
};
__decorate([
    Column({ type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement: false }),
    __metadata("design:type", Number)
], Wheel.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Wheel.prototype, "full_name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: true }),
    __metadata("design:type", String)
], Wheel.prototype, "full_name_color", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: true }),
    __metadata("design:type", String)
], Wheel.prototype, "full_name_hotline", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Wheel.prototype, "photo_url", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_cat", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: false }),
    __metadata("design:type", Date)
], Wheel.prototype, "update_date", void 0);
__decorate([
    ForeignKey(() => WheelBrand),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_brand", void 0);
__decorate([
    ForeignKey(() => WheelModel),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_model", void 0);
__decorate([
    ForeignKey(() => WheelBoltCount),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_bolt_count", void 0);
__decorate([
    ForeignKey(() => WheelBoltCountPcd),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_bolt_count_pcd", void 0);
__decorate([
    ForeignKey(() => WheelColor),
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], Wheel.prototype, "id_color", void 0);
__decorate([
    ForeignKey(() => WheelDia),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_dia", void 0);
__decorate([
    ForeignKey(() => WheelDiameter),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_diameter", void 0);
__decorate([
    ForeignKey(() => WheelEt),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_et", void 0);
__decorate([
    ForeignKey(() => WheelPcd),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_pcd", void 0);
__decorate([
    ForeignKey(() => WheelPcd2),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_pcd2", void 0);
__decorate([
    ForeignKey(() => WheelSizeDigits),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_size_digits", void 0);
__decorate([
    ForeignKey(() => WheelType),
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], Wheel.prototype, "id_type", void 0);
__decorate([
    ForeignKey(() => WheelWidth),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Wheel.prototype, "id_width", void 0);
__decorate([
    BelongsTo(() => Category, 'id_cat'),
    __metadata("design:type", Category)
], Wheel.prototype, "category", void 0);
__decorate([
    HasMany(() => StockWheels, 'id_wheel'),
    __metadata("design:type", Array)
], Wheel.prototype, "stock", void 0);
__decorate([
    HasMany(() => PriceWheels, 'id_wheel'),
    __metadata("design:type", Array)
], Wheel.prototype, "price", void 0);
__decorate([
    BelongsTo(() => WheelBrand, 'id_brand'),
    __metadata("design:type", WheelBrand)
], Wheel.prototype, "brand", void 0);
__decorate([
    BelongsTo(() => WheelModel, 'id_model'),
    __metadata("design:type", WheelModel)
], Wheel.prototype, "model", void 0);
__decorate([
    BelongsTo(() => WheelBoltCount, 'id_bolt_count'),
    __metadata("design:type", WheelBoltCount)
], Wheel.prototype, "bolt_count", void 0);
__decorate([
    BelongsTo(() => WheelBoltCountPcd, 'id_bolt_count_pcd'),
    __metadata("design:type", WheelBoltCountPcd)
], Wheel.prototype, "bolt_count_pcd", void 0);
__decorate([
    BelongsTo(() => WheelColor, 'id_color'),
    __metadata("design:type", WheelColor)
], Wheel.prototype, "color", void 0);
__decorate([
    BelongsTo(() => WheelDia, 'id_dia'),
    __metadata("design:type", WheelDia)
], Wheel.prototype, "dia", void 0);
__decorate([
    BelongsTo(() => WheelDiameter, 'id_diameter'),
    __metadata("design:type", WheelDiameter)
], Wheel.prototype, "diameter", void 0);
__decorate([
    BelongsTo(() => WheelEt, 'id_et'),
    __metadata("design:type", WheelEt)
], Wheel.prototype, "et", void 0);
__decorate([
    BelongsTo(() => WheelPcd, 'id_pcd'),
    __metadata("design:type", WheelPcd)
], Wheel.prototype, "pcd", void 0);
__decorate([
    BelongsTo(() => WheelPcd2, 'id_pcd2'),
    __metadata("design:type", WheelPcd2)
], Wheel.prototype, "pcd2", void 0);
__decorate([
    BelongsTo(() => WheelSizeDigits, 'id_size_digits'),
    __metadata("design:type", WheelSizeDigits)
], Wheel.prototype, "size_digits", void 0);
__decorate([
    BelongsTo(() => WheelType, 'id_type'),
    __metadata("design:type", WheelType)
], Wheel.prototype, "type", void 0);
__decorate([
    BelongsTo(() => WheelWidth, 'id_width'),
    __metadata("design:type", WheelWidth)
], Wheel.prototype, "width", void 0);
Wheel = __decorate([
    Table({ tableName: 'wheel', updatedAt: false })
], Wheel);
export { Wheel };
