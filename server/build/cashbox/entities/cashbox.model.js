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
import { Paynment } from "../../paynment/entities/paynment.model";
let Cashbox = class Cashbox extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Cashbox.prototype, "id_cashbox", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Cashbox.prototype, "cashbox", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Cashbox.prototype, "funds", void 0);
__decorate([
    HasMany(() => Paynment, 'id_cashbox'),
    __metadata("design:type", Array)
], Cashbox.prototype, "paynment", void 0);
Cashbox = __decorate([
    Table({ tableName: 'cashbox', createdAt: false, updatedAt: false })
], Cashbox);
export { Cashbox };
