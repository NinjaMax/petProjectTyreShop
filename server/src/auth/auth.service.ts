import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logIn-dto';
import { SignupDto } from './dto/signUp-dto';
import argon2 from 'argon2';
import { randomInt } from 'crypto';
import { sendSmsPass } from './gatewayApi/smsGateway';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}

  async findUser(userAuthDto: UserAuthDto) {
    const userIsExist = await this.usersService.findUserByPhone(userAuthDto);
    return userIsExist;
  }
  
  async createAccessToken(
    userAuthDto: UserAuthDto,
  ): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign({ sub: userAuthDto.phone }) };
  }

  async signUp(signupDto: SignupDto): Promise<{ accessToken: string }> {
    if (this.findUser(signupDto)) {
      throw new ConflictException(
        `User with username or phone ${signupDto.phone} already exists`,
      );
    }
    const createPass = {
      // id_user: signupDto.id_user,
      // email: signupDto.email,
      // id_contract: signupDto.id_contract,
      // balance: signupDto.balance,
      // name: signupDto.name,
      password: await argon2.hash(signupDto.password),
      // phone: signupDto.phone,
      // full_name: signupDto.full_name,
    };
    // this.users.push(user);
    const newUser = await this.usersService.createUser(
      signupDto,
      createPass.password,
    );

    return this.createAccessToken(newUser);
  }

  async preSignUp(signupDto: SignupDto) {
    if (this.findUser(signupDto)) {
      throw new ConflictException(
        `Користувач з ім'ям або номером ${signupDto.phone} вже існує.`,
      );
    }
    let randomPass: number = await randomInt(1000, 9000);
    const sendSms = await sendSmsPass(randomPass, signupDto.phone);

    if (!sendSms) {
      throw new HttpException (
        `Помилка, або не вірно вказаний номер телефону`,
        HttpStatus.BAD_REQUEST,
      );
    }
    //const match = await this.matchPass.bind(null, randomPass);
    setTimeout(() => (randomPass = null), 60000);

    return sendSms;
  }

  async matchPass(rndmPass: number, pass: number) {
    if (pass === rndmPass) {
      return true;
    } else {
      return false;
    //  throw new UnauthorizedException('Пароль не вірний або вже недійсний');
    }
  }

  async comparePass(pass: number) {
    return pass ? pass : null;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const existingUser = this.findUser(loginDto);
      if (!loginDto.phone) {
        throw new Error();
      }
      const passwordMatch = await argon2.verify(
        (
          await existingUser
        ).password,
        loginDto.password,
      );
      if (!passwordMatch) {
        throw new Error();
      }
      return this.createAccessToken(loginDto);
    } catch (e) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
