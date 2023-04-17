var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import { Cashbox } from '../../cashbox/entities/cashbox.model';
import { Contract } from '../../contract/entities/contract.model';
import { Expense } from '../../expenses/entities/expense.model';
import { Incomes } from '../../incomes/entities/income.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Orders } from '../../orders/entities/order.model';
let Paynment = class Paynment extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_paynment", void 0);
__decorate([
    Column({ type: DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Paynment.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Paynment.prototype, "notes", void 0);
__decorate([
    Column({ type: DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], Paynment.prototype, "status", void 0);
__decorate([
    ForeignKey(() => Cashbox),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_cashbox", void 0);
__decorate([
    ForeignKey(() => Orders),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_order", void 0);
__decorate([
    ForeignKey(() => OrdersSupplier),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_order_sup", void 0);
__decorate([
    ForeignKey(() => Contract),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_contract", void 0);
__decorate([
    ForeignKey(() => Incomes),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_income", void 0);
__decorate([
    ForeignKey(() => Expense),
    Column({ type: DataType.INTEGER }),
    __metadata("design:type", Number)
], Paynment.prototype, "id_expense", void 0);
__decorate([
    BelongsTo(() => Expense, 'id_expense'),
    __metadata("design:type", Expense)
], Paynment.prototype, "expenses", void 0);
__decorate([
    BelongsTo(() => Cashbox, 'id_cashbox'),
    __metadata("design:type", Cashbox)
], Paynment.prototype, "cashbox", void 0);
__decorate([
    BelongsTo(() => Orders, 'id_order'),
    __metadata("design:type", Orders)
], Paynment.prototype, "order", void 0);
__decorate([
    BelongsTo(() => OrdersSupplier, 'id_order_sup'),
    __metadata("design:type", OrdersSupplier)
], Paynment.prototype, "order_sup", void 0);
__decorate([
    BelongsTo(() => Incomes, 'id_income'),
    __metadata("design:type", Incomes)
], Paynment.prototype, "incomes", void 0);
__decorate([
    BelongsTo(() => Contract, 'id_contract'),
    __metadata("design:type", Contract)
], Paynment.prototype, "contract", void 0);
Paynment = __decorate([
    Table({ tableName: 'paynment' })
], Paynment);
export { Paynment };
