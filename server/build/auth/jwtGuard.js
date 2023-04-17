var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
let JwtGuard = class JwtGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = this.getRequest(context);
        try {
            const token = this.getToken(request);
            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    getRequest(context) {
        return context.switchToHttp().getRequest();
    }
    getToken(request) {
        const authorization = request.headers['authorization'];
        if (!authorization || Array.isArray(authorization)) {
            throw new Error('Invalid Authorization Header');
        }
        const [_, token] = authorization.split(' ');
        return token;
    }
};
JwtGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], JwtGuard);
export { JwtGuard };
