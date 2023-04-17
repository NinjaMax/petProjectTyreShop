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
let TyreSpeedIndex = class TyreSpeedIndex extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TyreSpeedIndex.prototype, "id_speed_index", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], TyreSpeedIndex.prototype, "speed_index", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], TyreSpeedIndex.prototype, "speed_index_with_desc", void 0);
__decorate([
    HasMany(() => Tyres, 'id_speed_index'),
    __metadata("design:type", Array)
], TyreSpeedIndex.prototype, "tyres", void 0);
TyreSpeedIndex = __decorate([
    Table({ tableName: 'tyre_speed_index', updatedAt: false, createdAt: false })
], TyreSpeedIndex);
export { TyreSpeedIndex };
