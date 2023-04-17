import { UserAuthDto } from './dto/user-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logIn-dto';
import { SignupDto } from './dto/signUp-dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    findUser(userAuthDto: UserAuthDto): Promise<import("../users/entities/users.model").Users>;
    createAccessToken(userAuthDto: UserAuthDto): Promise<{
        accessToken: string;
    }>;
    signUp(signupDto: SignupDto): Promise<{
        accessToken: string;
    }>;
    preSignUp(signupDto: SignupDto): Promise<import("axios").AxiosResponse<any, any>>;
    matchPass(rndmPass: number, pass: number): Promise<boolean>;
    comparePass(pass: number): Promise<number>;
    loginByPhone(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
