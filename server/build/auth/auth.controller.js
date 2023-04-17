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
import { Controller, Get, Post, Body, Param, Delete, Req, Res, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp-dto';
import { LoginDto } from './dto/logIn-dto';
import { ConfigService } from '../config/config.service';
import { GoogleAuthService } from './socialApi/google-auth/google-auth.service';
let AuthController = class AuthController {
    constructor(authService, configService, googleAuthService) {
        this.authService = authService;
        this.configService = configService;
        this.googleAuthService = googleAuthService;
    }
    signUp(res, signupDto) {
        const tokenAccess = this.authService.signUp(signupDto);
        res.cookie(this.configService.get('COOKIE_NAME'), tokenAccess, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
        });
        return 'Cookie set successfully';
    }
    getProfile(req) {
        return req.user;
    }
    loginByPhone(loginDto) {
        return this.authService.loginByPhone(loginDto);
    }
    preSignUp(signupDto) {
        return this.authService.preSignUp(signupDto);
    }
    matchPass(rndmPass, pass) {
        return this.authService.matchPass(rndmPass, pass);
    }
    getGoogleLogin() {
        return this.googleAuthService.getGoogleAuthURL();
    }
    getGoogleUser(res, req) {
        return this.googleAuthService.getGoogleUser(req, res);
    }
    getCurrentGoogleUser(res, req) {
        return this.googleAuthService.getCurrentUser(req, res);
    }
    findAll() {
        return this.authService.findAll();
    }
    findOne(id) {
        return this.authService.findOne(+id);
    }
    logOut(res) {
        return res.clearCookie('auth_token', { httpOnly: true });
    }
    remove(id) {
        return this.authService.remove(+id);
    }
};
__decorate([
    Post('signup'),
    __param(0, Res()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SignupDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    Get('profile'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    Post('login'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginByPhone", null);
__decorate([
    Post('presignup'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "preSignUp", null);
__decorate([
    Post('matchpass'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "matchPass", null);
__decorate([
    Get('google/url'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getGoogleLogin", null);
__decorate([
    Get('google'),
    __param(0, Res()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getGoogleUser", null);
__decorate([
    Get('user/google'),
    __param(0, Res()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentGoogleUser", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findOne", null);
__decorate([
    Delete('logout'),
    __param(0, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "remove", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        ConfigService,
        GoogleAuthService])
], AuthController);
export { AuthController };
