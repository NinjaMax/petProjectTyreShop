import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logIn-dto';
import { SignupDto } from './dto/signUp-dto';
import { CustomerAuthDto } from './dto/customer-auth-dto';
import * as argon2 from 'argon2';
import { randomInt } from 'crypto';
import { sendSmsPass } from './gatewayApi/smsGateway';
import { CustomersService } from '../customers/customers.service';
import { Request, Response } from 'express';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private customersService: CustomersService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async findUserByPhone(userAuthDto: UserAuthDto) {
    const userIsExist = await this.usersService.findUserByPhone(userAuthDto);
    return userIsExist;
  }

  // async findCustomersByPhone(customersDto: CustomerAuthDto) {
  //   return await this.customersService.findCustomerByPhone(customersDto);
  // }

  // async findCustomersByEmail(customersDto: CustomerAuthDto) {
  //   return await this.customersService.findCustomerByEmail(customersDto);
  // }

  async createAccessToken(
    customerAuthDto: CustomerAuthDto,
  ): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign({ sub: customerAuthDto }) };
  }

  async signUpCustm(res: Response, signupDto: SignupDto) {
    try {
      const custByPhone = await this.customersService.findCustomerByPhone(
        signupDto,
      );
      if (custByPhone) {
        throw new ConflictException(
          `Користувач з ім'ям або номер ${signupDto.phone} вже існує`,
        );
      } else {
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
        const newCustomer = await this.customersService.createCustomer(
          signupDto,
          createPass.password,
        );

        const tokenCutmAccess = await this.createAccessToken(newCustomer);
        console.log('SIGN_UP', tokenCutmAccess);
        res.cookie('auth_custm', tokenCutmAccess, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
        });
        return res.redirect(this.configService.get('APP_ROOT_URI'));
      }
    } catch (error) {
      console.log('SIGNUP_ERROR: ', error);
    }
  }

  async preSignUpCustm(signupDto: SignupDto) {
    try {
      const custPhone = await this.customersService.findCustomerByPhone(
        signupDto,
      );
      if (custPhone) {
        throw new ConflictException(
          `Користувач з ім'ям або номером ${signupDto.phone} вже існує.`,
        );
      } else {
        const dataReq = {
          auth: {
            key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
          },
          action: 'GETBALANCE',
        };
        const randomPass: number = randomInt(1000, 9000);
        const sendSms = await sendSmsPass(dataReq);
        //const sendSms = await sendSmsPass(randomPass, signupDto.phone);
        if (!sendSms.success) {
          throw new HttpException(
            `Помилка, або не вірно вказаний номер телефону`,
            HttpStatus.BAD_REQUEST,
          );
        }
        console.log(sendSms.success);
        console.log(randomPass);
        return randomPass;
      }
    } catch (error) {
      console.log('preSignUp: ', error);
    }
  }

  async matchPass(matchPass: { randomPass: number; passMatch: number }) {
    setTimeout(() => (matchPass.randomPass = null), 90000);
    console.log('RNDM_SMS ', matchPass.randomPass);
    console.log('PASSW_USER ', matchPass.passMatch);
    if (matchPass.randomPass === matchPass.passMatch) {
      return true;
    } else {
      return false;
      //  throw new UnauthorizedException('Пароль не вірний або вже недійсний');
    }
  }

  async comparePass(pass: number) {
    return pass ? pass : null;
  }

  async loginCustmByPhone(res: Response, loginDto: LoginDto) {
    try {
      const existingCustomer = await this.customersService.findCustomerByPhone(
        loginDto,
      );
      if (!existingCustomer) {
        throw new Error('Користувач з таким номером телефону не існує.');
      } else {
        const passwordMatch = await argon2.verify(
          (
            await existingCustomer
          ).password,
          loginDto.password,
        );
        if (!passwordMatch) {
          throw new Error();
        }
        const loginCustomer = await this.createAccessToken(existingCustomer);
        console.log('LOGIN_CUSTOMER: ', loginCustomer);
        res.cookie('auth_custm', loginCustomer, {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
        });
        return res.redirect(this.configService.get('APP_ROOT_URI'));
      }
    } catch (e) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  async getCurrentCustm(req: Request, res: Response) {
    try {
      const getCoockiesCustm: string | undefined = req.cookies['auth_custm'];
      console.log('GET_COOCKIES_CUSTM', getCoockiesCustm);
      if (getCoockiesCustm) {
        const decodedCustm = this.jwtService.verify(getCoockiesCustm);
        console.log('decoded', decodedCustm);
        return res.send(decodedCustm);
      } else {
        console.log('Користувач не авторизован');
      }
    } catch (err) {
      console.log(err);
      res.send('No Data');
    }
  }

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
