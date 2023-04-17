import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp-dto';
import { LoginDto } from './dto/logIn-dto';
import { ConfigService } from '../config/config.service';
import { GoogleAuthService } from './socialApi/google-auth/google-auth.service';
export declare class AuthController {
    private readonly authService;
    private configService;
    private googleAuthService;
    constructor(authService: AuthService, configService: ConfigService, googleAuthService: GoogleAuthService);
    signUp(res: Response, signupDto: SignupDto): string;
    getProfile(req: any): any;
    loginByPhone(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    preSignUp(signupDto: SignupDto): Promise<import("axios").AxiosResponse<any, any>>;
    matchPass(rndmPass: number, pass: number): Promise<boolean>;
    getGoogleLogin(): Promise<string>;
    getGoogleUser(res: Response, req: Request): Promise<void>;
    getCurrentGoogleUser(res: Response, req: Request): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    logOut(res: Response): Response<any, Record<string, any>>;
    remove(id: string): string;
}
