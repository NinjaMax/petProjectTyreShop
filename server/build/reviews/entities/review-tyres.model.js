var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne, } from 'sequelize-typescript';
import { Customer } from '../../customers/entities/customer.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../../ratings/entities/rating-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { Users } from '../../users/entities/users.model';
let ReviewTyres = class ReviewTyres extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id_review", void 0);
__decorate([
    ForeignKey(() => Tyres),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id", void 0);
__decorate([
    ForeignKey(() => TyreModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id_model", void 0);
__decorate([
    ForeignKey(() => TyreBrand),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id_brand", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({ type: DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id_customer", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], ReviewTyres.prototype, "id_user", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], ReviewTyres.prototype, "description", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], ReviewTyres.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Customer, 'id_customer'),
    __metadata("design:type", Customer)
], ReviewTyres.prototype, "customer", void 0);
__decorate([
    BelongsTo(() => Tyres, 'id'),
    __metadata("design:type", Tyres)
], ReviewTyres.prototype, "tyres", void 0);
__decorate([
    HasOne(() => RatingTyres, 'id_review'),
    __metadata("design:type", RatingTyres)
], ReviewTyres.prototype, "rating", void 0);
__decorate([
    BelongsTo(() => TyreModel, 'id_model'),
    __metadata("design:type", TyreModel)
], ReviewTyres.prototype, "model", void 0);
__decorate([
    BelongsTo(() => TyreBrand, 'id_brand'),
    __metadata("design:type", TyreBrand)
], ReviewTyres.prototype, "brand", void 0);
ReviewTyres = __decorate([
    Table({ tableName: 'review_tyres', createdAt: true, updatedAt: false })
], ReviewTyres);
export { ReviewTyres };
