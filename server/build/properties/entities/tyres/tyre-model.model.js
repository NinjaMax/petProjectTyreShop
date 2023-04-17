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
import { RatingTyres } from "../../../ratings/entities/rating-tyres.model";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { ReviewTyres } from "../../../reviews/entities/review-tyres.model";
let TyreModel = class TyreModel extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: false }),
    __metadata("design:type", Number)
], TyreModel.prototype, "id_model", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], TyreModel.prototype, "model", void 0);
__decorate([
    HasMany(() => Tyres, 'id_model'),
    __metadata("design:type", Array)
], TyreModel.prototype, "tyres", void 0);
__decorate([
    HasMany(() => RatingTyres, 'id_model'),
    __metadata("design:type", Array)
], TyreModel.prototype, "ratings", void 0);
__decorate([
    HasMany(() => ReviewTyres, 'id_model'),
    __metadata("design:type", Array)
], TyreModel.prototype, "reviews", void 0);
TyreModel = __decorate([
    Table({ tableName: 'tyre_model', updatedAt: false, createdAt: false })
], TyreModel);
export { TyreModel };
