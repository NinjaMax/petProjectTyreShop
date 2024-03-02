import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp-dto';
import { LoginDto } from './dto/logIn-dto';
import { ConfigService } from '../config/config.service';
import { GoogleAuthService } from './socialApi/google-auth.service';
import { FacebookAuthService } from './socialApi/facebook-auth.service';
import { Cookies } from './decorators/cookies.decorator';
import { TwitterAuthService } from './socialApi/twitter-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private googleAuthService: GoogleAuthService,
    private facebookAuthService: FacebookAuthService,
    private twitterAuthService: TwitterAuthService,
  ) {}

  @Post('signup')
  async signUpCust(@Res() res: Response, @Body() signupDto: SignupDto) {
    return res.send(await this.authService.signUpCustm(res, signupDto));
  }

  @Post('login')
  async loginByPhoneCustm(@Res() res: Response, @Body() loginDto: LoginDto) {
    return res.send(await this.authService.loginCustmByPhone(res, loginDto));
  }

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

  @Get('twitter/url')
  async getTwitterLogIn(@Res() res: Response) {
    return res.send(await this.twitterAuthService.getTwitterAuthURL());
  }

  @Get('twitter')
  async getTwitterUser(@Res() res: Response, @Req() req: Request) {
    return await this.twitterAuthService.getTwitterUser(req, res);
  }

  @Get('customer/twitter')
  async getCurrentTwitterUser(
    @Cookies('auth_twitter') cookies: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.twitterAuthService.getCurrentTwitterUser(
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
    return await this.authService.getCurrentCustm(req, res, cookies);
  }

  @Get('user/admin')
  async getCurUser(
    @Cookies('auth_user') cookies: { accessToken: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.getCurrentCustm(req, res, cookies);
  }

  @Post('user/login')
  async loginByPhoneUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
    return await this.authService.loginUserByPhone(res, loginDto);
  }

  @Post('user/signup')
  async signUpUser(@Res() res: Response, @Body() signupDto: SignupDto) {
    return res.send(await this.authService.signUpUser(res, signupDto));
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete('logout')
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
    res.clearCookie('auth_twitter', {
      httpOnly: true,
      secure: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
