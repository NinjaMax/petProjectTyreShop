var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany, } from 'sequelize-typescript';
import { Customer } from '../../customers/entities/customer.model';
import { Paynment } from '../../paynment/entities/paynment.model';
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Users } from '../../users/entities/users.model';
let Contract = class Contract extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Contract.prototype, "id_contract", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Contract.prototype, "name", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: true,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Contract.prototype, "balance", void 0);
__decorate([
    ForeignKey(() => Users),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Contract.prototype, "id_user", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Contract.prototype, "id_customer", void 0);
__decorate([
    ForeignKey(() => Supplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Contract.prototype, "id_supplier", void 0);
__decorate([
    BelongsTo(() => Users, 'id_user'),
    __metadata("design:type", Users)
], Contract.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Customer, 'id_customer'),
    __metadata("design:type", Customer)
], Contract.prototype, "customer", void 0);
__decorate([
    BelongsTo(() => Supplier, 'id_supplier'),
    __metadata("design:type", Supplier)
], Contract.prototype, "supplier", void 0);
__decorate([
    HasMany(() => Paynment, 'id_contract'),
    __metadata("design:type", Paynment)
], Contract.prototype, "paynment", void 0);
Contract = __decorate([
    Table({ tableName: 'contract' })
], Contract);
export { Contract };
