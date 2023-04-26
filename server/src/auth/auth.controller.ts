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
  Redirect,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SignupDto } from './dto/signUp-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/logIn-dto';
import { ConfigService } from '../config/config.service';
import { GoogleAuthService } from './socialApi/google-auth.service';
import { FacebookAuthService } from './socialApi/facebook-auth.service';
import { Cookies } from './decorators/cookies.decorator';
import cors from 'cors';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private googleAuthService: GoogleAuthService,
    private facebookAuthService: FacebookAuthService,
  ) {}

  //@Public()
  //@HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUpCust(@Res() res: Response, @Body() signupDto: SignupDto) {
    return res.send(await this.authService.signUpCustm(res, signupDto));
    // return res.cookie('auth_custm', tokenCutmAccess, {
    //   maxAge: 900000,
    //   httpOnly: true,
    //   secure: true,
    // });
  }

  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user;
  // }

  @Post('login')
  async loginByPhoneCustm(@Res() res: Response, @Body() loginDto: LoginDto) {
    return res.send(await this.authService.loginCustmByPhone(res, loginDto));
    // return res.cookie('auth_custm', loginCustomer, {
    //   maxAge: 900000,
    //   httpOnly: true,
    //   secure: true,
    // });
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

  @Get('customer/google')
  async getCurrentGoogleUser(
    @Cookies('auth_token') cookies: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    //const getCoockies = await req.cookies['auth_token'];
    return await this.googleAuthService.getCurrentUser(req, res, cookies);
  }

  @Get('facebook/url')
  async getFacebookLogIn(@Res() res: Response) {
    return res.send(await this.facebookAuthService.getFacebookAuthURL());
  }

  @Get('facebook')
  async getFacebookUser(@Res() res: Response, @Req() req: Request) {
    return await this.facebookAuthService.getFacebookUser(req, res);
  }

  @Get('customer/facebook')
  async getCurrentFacebookUser(
    @Cookies('auth_facebook') cookies: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.facebookAuthService.getCurrentFacebookUser(
      req,
      res,
      cookies,
    );
  }

  @Get('customer/phone')
  async getCurCusrtm(
    @Cookies('auth_custm') cookies: { accessToken: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('COOKIES_CUST: ', cookies);
    return await this.authService.getCurrentCustm(req, res, cookies);
  }

  @Get('user/admin')
  async getCurUser(
    @Cookies('auth_user') cookies: { accessToken: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('COOKIES_CUST: ', cookies);
    return await this.authService.getCurrentCustm(req, res, cookies);
  }

  @Post('user/login')
  @Redirect('https://localhost:3000/admin', 200)
  async loginByPhoneUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
     const logIn = await this.authService.loginUserByPhone(res, loginDto);
      if (!logIn.status) {
        return res.redirect('https://localhost:3000/admin/auth');
      } 
      // else {
      //   return res.redirect('https://localhost:3000/admin');
      // }
  }

  @Post('user/signup')
  async signUpUser(@Res() res: Response, @Body() signupDto: SignupDto) {
    return res.send(await this.authService.signUpUser(res, signupDto));
    // return res.cookie('auth_custm', tokenCutmAccess, {
    //   maxAge: 900000,
    //   httpOnly: true,
    //   secure: true,
    // });
  }

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
  //@Redirect('https://localhost:3000')
  logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie('auth_facebook', {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie('auth_custm', {
      httpOnly: true,
      secure: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
