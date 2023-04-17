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
import { ContractService } from '../contract/contract.service';
import { Users } from './entities/users.model';
let UsersService = class UsersService {
    constructor(usersRepository, contractService) {
        this.usersRepository = usersRepository;
        this.contractService = contractService;
    }
    createUser(createUserDto, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.usersRepository.create({
                    password: password,
                    id_user: createUserDto.id_user,
                    email: createUserDto.email,
                    id_contract: createUserDto.id_contract,
                    balance: createUserDto.balance,
                    name: createUserDto.name,
                    phone: createUserDto.phone,
                    full_name: createUserDto.full_name,
                });
                const contractUser = yield this.contractService.createContract(createUserDto);
                yield newUser.$add('contract', contractUser);
                return newUser;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAlluser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersAll = yield this.usersRepository.findAll({
                    include: { all: true },
                });
                return usersAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findUserById(getUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield this.usersRepository.findByPk(getUserDto.id_user, { include: { all: true } });
                return userId;
            }
            catch (_a) {
                throw new HttpException('Data ID is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findUserByName(getUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userByName = yield this.usersRepository.findOne({ where: { name: getUserDto.name } });
                return userByName;
            }
            catch (_a) {
                throw new HttpException('Data ID is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findUserByPhone(getUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userByPhone = yield this.usersRepository.findOne({
                    where: { phone: getUserDto.phone }
                });
                return userByPhone;
            }
            catch (_a) {
                throw new HttpException('Data PHONE is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateUserByUser(id_user, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield this.usersRepository.findByPk(updateUserDto.id_user, { include: { all: true } });
                if (userId) {
                    yield this.usersRepository.update({
                        name: updateUserDto.name,
                        full_name: updateUserDto.full_name,
                        email: updateUserDto.email,
                    }, { where: { id_user: userId.id_user } });
                    userId.save();
                    return userId;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeUser(getUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyres = yield this.usersRepository.destroy({ where: { id_user: getUserDto.id_user } });
                return removeTyres;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectModel(Users)),
    __metadata("design:paramtypes", [Object, ContractService])
], UsersService);
export { UsersService };
