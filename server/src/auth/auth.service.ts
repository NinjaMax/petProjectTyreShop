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

  // async findUserByPhone(userAuthDto: UserAuthDto) {
  //   const userIsExist = await this.usersService.findUserByPhone(userAuthDto);
  //   return userIsExist;
  // }

  async createAccessToken(
    customerAuthDto: CustomerAuthDto,
  ): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign({ sub: customerAuthDto }) };
  }

  async createAccessTokenUser(
    userAuthDto: UserAuthDto,
  ): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign({ sub: userAuthDto }) };
  }

  async signUpCustm(res: Response, signupDto: SignupDto) {
    try {
      const custByPhone = await this.customersService.findCustomerByPhone(
        signupDto,
      );
      if (custByPhone) {
        throw new HttpException(
          `Користувач з ім'ям або номер ${signupDto.phone} вже існує`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const createPass = {
          password: await argon2.hash(signupDto.password),
        };
        const newCustomer = await this.customersService.createCustomer(
          signupDto,
          createPass.password,
        );

        const tokenCutmAccess = await this.createAccessToken(newCustomer);
        //console.log('SIGN_UP', tokenCutmAccess);
        res.cookie('auth_custm', tokenCutmAccess, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
        });
      }
    } catch (error) {
      console.log('SIGNUP_ERROR: ', error);
      throw new HttpException(`${error.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async preSignUpCustm(signupDto: SignupDto) {
    try {
      const custPhone = await this.customersService.findCustomerByPhone(
        signupDto,
      );
      if (custPhone) {
        throw new HttpException(
          `Користувач з ім'ям або номером ${signupDto.phone} вже існує.`,
          HttpStatus.BAD_REQUEST,
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
      //console.log('preSignUp: ', error);
      throw new HttpException(`${error.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async matchPass(matchPass: { randomPass: number; passMatch: number }) {
    try {
      setTimeout(() => (matchPass.randomPass = null), 90000);
      console.log('RANDOM_SMS ', matchPass.randomPass);
      console.log('PASSW_USER ', matchPass.passMatch);
      if (matchPass.randomPass === matchPass.passMatch) {
        return true;
      } else {
        throw new HttpException(
          `Не дійсний або не вірний пароль.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async loginCustmByPhone(res: Response, loginDto: LoginDto) {
    try {
      const existingCustomer = await this.customersService.findCustomerByPhone(
        loginDto,
      );
      if (!existingCustomer) {
        throw new HttpException(
          `Користувач з таким номером ${loginDto.phone} телефону не існує.`,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        const passwordMatch = await argon2.verify(
          existingCustomer.password,
          loginDto.password,
        );
        if (!passwordMatch) {
          throw new HttpException(
            `Не вірно вказаний пароль`,
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          const loginUser = await this.createAccessToken(existingCustomer);
          //console.log('LOGIN_CUSTOMER: ', loginUser);
          res.cookie('auth_custm', loginUser, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
          });
          return true;
        }
        //return res.redirect(this.configService.get('APP_ROOT_URI'));
      }
    } catch (e) {
      throw new HttpException(`${e.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async getCurrentCustm(
    req: Request,
    res: Response,
    cookie_custm: { accessToken: string },
  ) {
    //console.log('GET_Customer');
    try {
      // const getCoockiesCustm: string | undefined = req.cookies[name];
      // console.log('GET_COOCKIES_CUSTM', getCoockiesCustm);
      if (cookie_custm) {
        const decodedCustm: any = this.jwtService.verify(
          cookie_custm.accessToken,
        );
        // const existingCustomer =
        //   await this.customersService.findCustomerByPhone(decodedCustm.phone);
        //console.log('decoded_COOKIE: ', decodedCustm);
        return decodedCustm;
      } else {
        console.log('Користувач не авторизован');
      }
    } catch (err) {
      console.log(err);
      res.send('No Data');
    }
  }

  async signUpUser(res: Response, signupDto: SignupDto) {
    try {
      const userByPhone = await this.usersService.findUserByPhone(signupDto);
      if (userByPhone) {
        throw new HttpException(
          `Користувач з ім'ям або номер ${signupDto.phone} вже існує`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const createPass = {
          password: await argon2.hash(signupDto.password),
        };
        const newUser = await this.usersService.createUser(
          signupDto,
          createPass.password,
        );
        const tokenUserAccess = await this.createAccessTokenUser(newUser);
        //console.log('SIGN_UP', tokenUserAccess);
        res.cookie('auth_user', tokenUserAccess, {
          maxAge: 36000000,
          httpOnly: true,
          secure: true,
        });
      }
    } catch (error) {
      //console.log('SIGNUP_ERROR: ', error);
      throw new HttpException(`${error.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async loginUserByPhone(res: Response, loginDto: LoginDto) {
    try {
      const existingUser = await this.usersService.findUserByPhone(loginDto);
      if (!existingUser) {
        throw new HttpException(
          `Користувач з таким номером ${loginDto.phone} телефону не існує.`,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        const passwordMatch = await argon2.verify(
          existingUser.password,
          loginDto.password,
        );
        if (!passwordMatch) {
          throw new HttpException(
            `Не вірно вказаний пароль`,
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          const loginUser = await this.createAccessTokenUser(existingUser);
          //console.log('LOGIN_USER: ', loginUser);
          res.cookie('auth_user', loginUser, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
          });
          return true;
        }
      }
    } catch (e) {
      throw new HttpException(`${e.message}`, HttpStatus.UNAUTHORIZED);
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
