import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SignupDto } from './dto/signUp-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/logIn-dto';
import { ConfigService } from '../config/config.service';
import { GoogleAuthService } from './socialApi/google-auth/google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private googleAuthService: GoogleAuthService,
  ) {}

  //@Public()
  //@HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUpCust(@Res() res: Response, @Body() signupDto: SignupDto) {
    const tokenAccess = await this.authService.signUpCustm(signupDto);
    res.cookie('auth_custm', tokenAccess, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    return 'Cookie set successfully';
  }

  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user;
  // }

  @Post('login')
  async loginByPhoneCustm(@Res() res: Response, @Body() loginDto: LoginDto) {
    const loginCustomer = await this.authService.loginCustmByPhone(loginDto);
    return res.cookie('auth_custm', loginCustomer, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
  }

  //@Public()
  //@HttpCode(HttpStatus.OK)
  @Post('presignup')
  async preSignUpCustomer(@Body() signupDto: SignupDto) {
    return await this.authService.preSignUpCustm(signupDto);
  }

  @Post('matchpass')
  async matchPass(
    @Body() matchPass: { randomPass: number; passMatch: number },
  ) {
    return await this.authService.matchPass(matchPass);
  }

  @Get('google/url')
  async getGoogleLogIn(@Res() res: Response) {
    return res.send(await this.googleAuthService.getGoogleAuthURL());
  }

  @Get('google')
  async getGoogleUser(@Res() res: Response, @Req() req: Request) {
    return await this.googleAuthService.getGoogleUser(req, res);
  }

  @Get('user/google')
  async getCurrentGoogleUser(@Req() req: Request, @Res() res: Response) {
    //const getCoockies = await req.cookies['auth_token'];
    return await this.googleAuthService.getCurrentUser(req, res);
  }

  // @Post()
  // create(@Body(userauth: UserAuthDto)) {
  //   return this.authService.create(userauth);
  // }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  //}

  @Delete('logout')
  logOut(@Res() res: Response) {
    return res.clearCookie(this.configService.get('COOKIE_NAME'), {
      httpOnly: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
