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
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import queryString from 'query-string';
import { ConfigService } from '../../../config/config.service';
let GoogleAuthService = class GoogleAuthService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    getGoogleAuthURL() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
            const options = {
                redirect_uri: `${this.configService.get('SERVER_ROOT_URI')}/${this.configService.get('REDIRECT_URI')}`,
                client_id: this.configService.get('GOOGLE_CLIENT_ID'),
                access_type: 'offline',
                response_type: 'code',
                prompt: 'consent',
                scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email',
                ].join(' '),
            };
            return `${rootUrl}?${queryString.stringify(options)}`;
        });
    }
    getTokensGoogle({ code, clientId, clientSecret, redirectUri, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://oauth2.googleapis.com/token';
            const values = {
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            };
            return axios
                .post(url, queryString.stringify(values), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then((res) => res.data)
                .catch((error) => {
                console.error(`Failed to fetch auth tokens`);
                throw new Error(error.message);
            });
        });
    }
    getGoogleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.query.code;
            const { id_token, access_token } = yield this.getTokensGoogle({
                code,
                clientId: this.configService.get('GOOGLE_CLIENT_ID'),
                clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
                redirectUri: `${this.configService.get('SERVER_ROOT_URI')}/${this.configService.get('REDIRECT_URI')}`,
            });
            const googleUser = yield axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            })
                .then((res) => res.data)
                .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });
            const token = this.jwtService.sign(googleUser);
            res.cookie(this.configService.get('COOKIE_NAME'), token, {
                maxAge: 900000,
                httpOnly: true,
                secure: false,
            });
            res.redirect(this.configService.get('APP_ROOT_URI'));
        });
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get user');
            try {
                const decoded = this.jwtService.verify(req.cookies[this.configService.get('COOKIE_NAME')]);
                console.log('decoded', decoded);
                return res.send(decoded);
            }
            catch (err) {
                console.log(err);
                res.send('No Data');
            }
        });
    }
};
GoogleAuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        JwtService])
], GoogleAuthService);
export { GoogleAuthService };
