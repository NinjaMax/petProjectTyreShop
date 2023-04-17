var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';
let RatingTyres = class RatingTyres extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "id_rating", void 0);
__decorate([
    ForeignKey(() => Tyres),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "id", void 0);
__decorate([
    ForeignKey(() => ReviewTyres),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "id_review", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_overall", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_dry_road", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_wet_road", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_snow_road", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_ice_road", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_cross_country", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_treadwear", void 0);
__decorate([
    Column({ type: DataType.FLOAT, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "rating_price_quality", void 0);
__decorate([
    ForeignKey(() => TyreModel),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "id_model", void 0);
__decorate([
    ForeignKey(() => TyreBrand),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], RatingTyres.prototype, "id_brand", void 0);
__decorate([
    BelongsTo(() => Tyres, 'id'),
    __metadata("design:type", Tyres)
], RatingTyres.prototype, "tyres", void 0);
__decorate([
    BelongsTo(() => ReviewTyres, 'id_review'),
    __metadata("design:type", ReviewTyres)
], RatingTyres.prototype, "review", void 0);
__decorate([
    BelongsTo(() => TyreModel, 'id_model'),
    __metadata("design:type", TyreModel)
], RatingTyres.prototype, "tyre_model", void 0);
__decorate([
    BelongsTo(() => TyreBrand, 'id_brand'),
    __metadata("design:type", TyreBrand)
], RatingTyres.prototype, "tyre_brand", void 0);
RatingTyres = __decorate([
    Table({ tableName: 'rating_tyres', createdAt: false, updatedAt: false })
], RatingTyres);
export { RatingTyres };
