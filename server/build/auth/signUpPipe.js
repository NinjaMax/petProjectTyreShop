var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BadRequestException, Injectable, } from '@nestjs/common';
let SignupPipe = class SignupPipe {
    transform(value, _metadata) {
        const errors = [];
        if (!this.valueHasPassAndConfPass(value)) {
            throw new BadRequestException('Invalid Request Body');
        }
        if (value.password.length < 12) {
            errors.push('password should be at least 12 characters long');
        }
        if (value.password !== value.password) {
            errors.push('password and confirmationPassword do not match');
        }
        if (errors.length) {
            throw new BadRequestException(errors.join('\n'));
        }
        return value;
    }
    valueHasPassAndConfPass(val) {
        return (typeof val === 'object' &&
            'password' in val &&
            'confirmationPassword' in val);
    }
};
SignupPipe = __decorate([
    Injectable()
], SignupPipe);
export { SignupPipe };
