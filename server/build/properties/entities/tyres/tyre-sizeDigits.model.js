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
import { Tyres } from "../../../tyres/entities/tyres.model";
let TyreSizeDigits = class TyreSizeDigits extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TyreSizeDigits.prototype, "id_size_digits", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: true }),
    __metadata("design:type", String)
], TyreSizeDigits.prototype, "size_only_digits", void 0);
__decorate([
    HasMany(() => Tyres, 'id_size_digits'),
    __metadata("design:type", Array)
], TyreSizeDigits.prototype, "tyres", void 0);
TyreSizeDigits = __decorate([
    Table({ tableName: 'tyre_size_digits', updatedAt: false, createdAt: false })
], TyreSizeDigits);
export { TyreSizeDigits };
