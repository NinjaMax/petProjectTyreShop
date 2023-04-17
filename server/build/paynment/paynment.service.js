var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paynment } from './entities/paynment.model';
import { CashboxService } from '../cashbox/cashbox.service';
import { ContractService } from '../contract/contract.service';
import { ExpensesService } from '../expenses/expenses.service';
import { IncomesService } from '../incomes/incomes.service';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
let PaynmentService = class PaynmentService {
    constructor(paynmentRepository, orderService, ordersSupService, cashboxService, expensesService, incomesService, contractService) {
        this.paynmentRepository = paynmentRepository;
        this.orderService = orderService;
        this.ordersSupService = ordersSupService;
        this.cashboxService = cashboxService;
        this.expensesService = expensesService;
        this.incomesService = incomesService;
        this.contractService = contractService;
    }
    createPaynment(createPaynmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.findOrderById(createPaynmentDto);
                const orderSup = yield this.ordersSupService.findOrderSupById(createPaynmentDto);
                const cashBox = yield this.cashboxService.findCashboxById(createPaynmentDto);
                const income = yield this.incomesService.findIncomeById(createPaynmentDto);
                const expense = yield this.expensesService.findExpenseById(createPaynmentDto);
                const contract = yield this.contractService.findContractById(createPaynmentDto);
                const paynment = yield this.paynmentRepository.create(createPaynmentDto);
                if (expense) {
                    const paynmentIdExp = yield this.paynmentRepository.findByPk(paynment.id_paynment);
                    if (order) {
                        yield order.$add('paynment', paynmentIdExp.id_paynment);
                        order.paynment.push(paynmentIdExp);
                    }
                    if (orderSup) {
                        yield orderSup.$add('paynment', paynmentIdExp.id_paynment);
                        orderSup.paynment.push(paynmentIdExp);
                    }
                    yield expense.$add('paynment', paynmentIdExp.id_paynment);
                    yield contract.decrement('balance', { by: paynmentIdExp.price });
                    yield cashBox.decrement('funds', { by: paynmentIdExp.price });
                    yield contract.reload();
                    yield cashBox.reload();
                    return paynmentIdExp;
                }
                if (income) {
                    const paynmentIdInc = yield this.paynmentRepository.findByPk(paynment.id_paynment);
                    if (order) {
                        yield order.$add('paynment', paynmentIdInc.id_paynment);
                        order.paynment.push(paynmentIdInc);
                    }
                    if (orderSup) {
                        yield orderSup.$add('paynment', paynmentIdInc.id_paynment);
                        orderSup.paynment.push(paynmentIdInc);
                    }
                    yield income.$add('paynment', paynmentIdInc.id_paynment);
                    yield contract.increment('balance', { by: paynmentIdInc.price });
                    yield cashBox.increment('funds', { by: paynmentIdInc.price });
                    yield contract.reload();
                    yield cashBox.reload();
                    return paynmentIdInc;
                }
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllPaynment() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paynmentAll = yield this.paynmentRepository.findAll({ include: { all: true } });
                return paynmentAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findPaynmentById(getPaynmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paynmentById = yield this.paynmentRepository.findByPk(getPaynmentDto.id_paynment, { include: { all: true } });
                return paynmentById;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updatePaynmentDto) {
        return `This action updates a #${id} paynment`;
    }
    removePaynment(getPaynmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paynmentRemove = yield this.paynmentRepository.destroy({ where: { id_paynment: getPaynmentDto.id_paynment } });
                return paynmentRemove;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PaynmentService = __decorate([
    Injectable(),
    __param(0, InjectModel(Paynment)),
    __metadata("design:paramtypes", [Object, OrdersService,
        OrdersSuppliersService,
        CashboxService,
        ExpensesService,
        IncomesService,
        ContractService])
], PaynmentService);
export { PaynmentService };
