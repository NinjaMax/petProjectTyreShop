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
import { Incomes } from './entities/income.model';
let IncomesService = class IncomesService {
    constructor(incomeRepository) {
        this.incomeRepository = incomeRepository;
    }
    createIncome(createIncomeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const income = yield this.incomeRepository.create(createIncomeDto);
                return income;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllIncome() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const incomeAll = yield this.incomeRepository.findAll({ include: { all: true } });
                return incomeAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findIncomeById(getIncomeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const incomeById = yield this.incomeRepository.findByPk(getIncomeDto.id_income, { include: { all: true } });
                return incomeById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateIncomeDto) {
        return `This action updates a #${id} income`;
    }
    removeIncome(getIncomeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const incomeRemove = yield this.incomeRepository.destroy({ where: { id_income: getIncomeDto.id_income } });
                return incomeRemove;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
IncomesService = __decorate([
    Injectable(),
    __param(0, InjectModel(Incomes)),
    __metadata("design:paramtypes", [Object])
], IncomesService);
export { IncomesService };
