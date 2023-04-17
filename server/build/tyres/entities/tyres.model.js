var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { PriceTyres } from '../../prices/entities/price-tyres.model';
import { StockTyres } from '../../stock/entities/stock-tyres.model';
import { Category } from '../../categorys/entities/category.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreCountry } from '../../properties/entities/tyres/tyre-country.model';
import { TyreDemo } from '../../properties/entities/tyres/tyre-demo.model';
import { TyreDiameter } from '../../properties/entities/tyres/tyre-diameter.model';
import { TyreHeight } from '../../properties/entities/tyres/tyre-height.model';
import { TyreHomologation } from '../../properties/entities/tyres/tyre-homologation.model';
import { TyreLoadIndex } from '../../properties/entities/tyres/tyre-loadIndex.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { TyreParams } from '../../properties/entities/tyres/tyre-params.model';
import { TyreReinforce } from '../../properties/entities/tyres/tyre-reinforce.model';
import { TyreRunFlat } from '../../properties/entities/tyres/tyre-runFlat.model';
import { TyreSeal } from '../../properties/entities/tyres/tyre-seal.model';
import { TyreSeason } from '../../properties/entities/tyres/tyre-season.model';
import { TyreSilent } from '../../properties/entities/tyres/tyre-silent.model';
import { TyreSizeDigits } from '../../properties/entities/tyres/tyre-sizeDigits.model';
import { TyreSpeedIndex } from '../../properties/entities/tyres/tyre-speedIndex.model';
import { TyreStudded } from '../../properties/entities/tyres/tyre-studded.model';
import { TyreVehicleType } from '../../properties/entities/tyres/tyre-vehicleType.model';
import { TyreWidth } from '../../properties/entities/tyres/tyre-width.model';
import { TyreYear } from '../../properties/entities/tyres/tyre-year.model';
import { RatingTyres } from '../../ratings/entities/rating-tyres.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
let Tyres = class Tyres extends Model {
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
], Tyres.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Tyres.prototype, "full_name", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Tyres.prototype, "photo_url", void 0);
__decorate([
    Column({ type: DataType.DATE, unique: false, allowNull: true }),
    __metadata("design:type", Date)
], Tyres.prototype, "update_date", void 0);
__decorate([
    ForeignKey(() => TyreBrand),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_brand", void 0);
__decorate([
    ForeignKey(() => TyreModel),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_model", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_cat", void 0);
__decorate([
    ForeignKey(() => TyreParams),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_params", void 0);
__decorate([
    ForeignKey(() => TyreSeason),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_season", void 0);
__decorate([
    ForeignKey(() => TyreWidth),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_width", void 0);
__decorate([
    ForeignKey(() => TyreHeight),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_height", void 0);
__decorate([
    ForeignKey(() => TyreDiameter),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_diameter", void 0);
__decorate([
    ForeignKey(() => TyreLoadIndex),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_load_index", void 0);
__decorate([
    ForeignKey(() => TyreSpeedIndex),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_speed_index", void 0);
__decorate([
    ForeignKey(() => TyreCountry),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_country", void 0);
__decorate([
    ForeignKey(() => TyreYear),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_year", void 0);
__decorate([
    ForeignKey(() => TyreVehicleType),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_vehicle_type", void 0);
__decorate([
    ForeignKey(() => TyreReinforce),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_reinforce", void 0);
__decorate([
    ForeignKey(() => TyreRunFlat),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_run_flat", void 0);
__decorate([
    ForeignKey(() => TyreStudded),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_studded", void 0);
__decorate([
    ForeignKey(() => TyreHomologation),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_homologation", void 0);
__decorate([
    ForeignKey(() => TyreDemo),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_demo", void 0);
__decorate([
    ForeignKey(() => TyreSizeDigits),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_size_digits", void 0);
__decorate([
    ForeignKey(() => TyreSeal),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_seal", void 0);
__decorate([
    ForeignKey(() => TyreSilent),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Tyres.prototype, "id_silent", void 0);
__decorate([
    HasMany(() => StockTyres, 'id_tyre'),
    __metadata("design:type", Array)
], Tyres.prototype, "stock", void 0);
__decorate([
    HasMany(() => PriceTyres, 'id_tyre'),
    __metadata("design:type", Array)
], Tyres.prototype, "price", void 0);
__decorate([
    HasMany(() => ReviewTyres, 'id'),
    __metadata("design:type", Array)
], Tyres.prototype, "reviews", void 0);
__decorate([
    HasMany(() => RatingTyres, 'id'),
    __metadata("design:type", Array)
], Tyres.prototype, "rating", void 0);
__decorate([
    BelongsTo(() => Category, 'id_cat'),
    __metadata("design:type", Category)
], Tyres.prototype, "category", void 0);
__decorate([
    BelongsTo(() => TyreParams, 'id_params'),
    __metadata("design:type", TyreParams)
], Tyres.prototype, "params", void 0);
__decorate([
    BelongsTo(() => TyreBrand, 'id_brand'),
    __metadata("design:type", TyreBrand)
], Tyres.prototype, "tyre_brand", void 0);
__decorate([
    BelongsTo(() => TyreModel, 'id_model'),
    __metadata("design:type", TyreModel)
], Tyres.prototype, "tyre_model", void 0);
__decorate([
    BelongsTo(() => TyreSeason, 'id_season'),
    __metadata("design:type", TyreSeason)
], Tyres.prototype, "season", void 0);
__decorate([
    BelongsTo(() => TyreWidth, 'id_width'),
    __metadata("design:type", TyreWidth)
], Tyres.prototype, "width", void 0);
__decorate([
    BelongsTo(() => TyreHeight, 'id_height'),
    __metadata("design:type", TyreHeight)
], Tyres.prototype, "height", void 0);
__decorate([
    BelongsTo(() => TyreDiameter, 'id_diameter'),
    __metadata("design:type", TyreDiameter)
], Tyres.prototype, "diameter", void 0);
__decorate([
    BelongsTo(() => TyreLoadIndex, 'id_load_index'),
    __metadata("design:type", TyreLoadIndex)
], Tyres.prototype, "load_index", void 0);
__decorate([
    BelongsTo(() => TyreSpeedIndex, 'id_speed_index'),
    __metadata("design:type", TyreSpeedIndex)
], Tyres.prototype, "speed_index", void 0);
__decorate([
    BelongsTo(() => TyreCountry, 'id_country'),
    __metadata("design:type", TyreCountry)
], Tyres.prototype, "country", void 0);
__decorate([
    BelongsTo(() => TyreYear, 'id_year'),
    __metadata("design:type", TyreYear)
], Tyres.prototype, "year", void 0);
__decorate([
    BelongsTo(() => TyreVehicleType, 'id_vehicle_type'),
    __metadata("design:type", TyreVehicleType)
], Tyres.prototype, "vehicle_type", void 0);
__decorate([
    BelongsTo(() => TyreReinforce, 'id_reinforce'),
    __metadata("design:type", TyreReinforce)
], Tyres.prototype, "reinforce", void 0);
__decorate([
    BelongsTo(() => TyreRunFlat, 'id_run_flat'),
    __metadata("design:type", TyreRunFlat)
], Tyres.prototype, "run_flat", void 0);
__decorate([
    BelongsTo(() => TyreStudded, 'id_studded'),
    __metadata("design:type", TyreStudded)
], Tyres.prototype, "studded", void 0);
__decorate([
    BelongsTo(() => TyreHomologation, 'id_homologation'),
    __metadata("design:type", TyreHomologation)
], Tyres.prototype, "homologation", void 0);
__decorate([
    BelongsTo(() => TyreDemo, 'id_demo'),
    __metadata("design:type", TyreDemo)
], Tyres.prototype, "demo", void 0);
__decorate([
    BelongsTo(() => TyreSizeDigits, 'id_size_digits'),
    __metadata("design:type", TyreSizeDigits)
], Tyres.prototype, "size_digits", void 0);
__decorate([
    BelongsTo(() => TyreSeal, 'id_seal'),
    __metadata("design:type", TyreSeal)
], Tyres.prototype, "seal", void 0);
__decorate([
    BelongsTo(() => TyreSilent, 'id_silent'),
    __metadata("design:type", TyreSilent)
], Tyres.prototype, "silent", void 0);
Tyres = __decorate([
    Table({ tableName: 'tyres', updatedAt: false })
], Tyres);
export { Tyres };
