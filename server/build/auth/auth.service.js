var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { randomInt } from 'crypto';
import { sendSmsPass } from './gatewayApi/smsGateway';
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    findUser(userAuthDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIsExist = yield this.usersService.findUserByPhone(userAuthDto);
            return userIsExist;
        });
    }
    createAccessToken(userAuthDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return { accessToken: this.jwtService.sign({ sub: userAuthDto }) };
        });
    }
    signUp(signupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.findUser(signupDto)) {
                throw new ConflictException(`User with username or phone ${signupDto.phone} already exists`);
            }
            const createPass = {
                password: yield argon2.hash(signupDto.password),
            };
            const newUser = yield this.usersService.createUser(signupDto, createPass.password);
            return this.createAccessToken(newUser);
        });
    }
    preSignUp(signupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.findUser(signupDto)) {
                throw new ConflictException(`Користувач з ім'ям або номером ${signupDto.phone} вже існує.`);
            }
            let randomPass = yield randomInt(1000, 9000);
            const sendSms = yield sendSmsPass(randomPass, signupDto.phone);
            if (!sendSms) {
                throw new HttpException(`Помилка, або не вірно вказаний номер телефону`, HttpStatus.BAD_REQUEST);
            }
            setTimeout(() => (randomPass = null), 60000);
            return sendSms;
        });
    }
    matchPass(rndmPass, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pass === rndmPass) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    comparePass(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return pass ? pass : null;
        });
    }
    loginByPhone(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.findUser(loginDto);
                if (!existingUser) {
                    throw new Error();
                }
                const passwordMatch = yield argon2.verify((yield existingUser).password, loginDto.password);
                if (!passwordMatch) {
                    throw new Error();
                }
                return this.createAccessToken(loginDto);
            }
            catch (e) {
                throw new UnauthorizedException('Username or password may be incorrect. Please try again');
            }
        });
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService,
        JwtService])
], AuthService);
export { AuthService };
