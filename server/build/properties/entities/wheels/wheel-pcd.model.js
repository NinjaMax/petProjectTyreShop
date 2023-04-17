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
import { Wheel } from "../../../wheels/entities/wheel.model";
let WheelPcd = class WheelPcd extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], WheelPcd.prototype, "id_pcd", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], WheelPcd.prototype, "pcd", void 0);
__decorate([
    HasMany(() => Wheel, 'id_pcd'),
    __metadata("design:type", Array)
], WheelPcd.prototype, "wheels", void 0);
WheelPcd = __decorate([
    Table({ tableName: 'wheel_pcd', updatedAt: false, createdAt: false })
], WheelPcd);
export { WheelPcd };
