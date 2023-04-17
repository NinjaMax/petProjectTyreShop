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
  signUp(@Res() res: Response, @Body() signupDto: SignupDto) {
    const tokenAccess = this.authService.signUp(signupDto);
    res.cookie(this.configService.get('COOKIE_NAME'), tokenAccess, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });
    return 'Cookie set successfully';
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('login')
  loginByPhone(@Body() loginDto: LoginDto) {
    return this.authService.loginByPhone(loginDto);
  }

  //@Public()
  //@HttpCode(HttpStatus.OK)
  @Post('presignup')
  preSignUp(@Body() signupDto: SignupDto) {
    return this.authService.preSignUp(signupDto);
  }

  @Post('matchpass')
  matchPass(@Body() rndmPass: number, pass: number) {
    return this.authService.matchPass(rndmPass, pass);
  }

  @Get('google/url')
  getGoogleLogin() {
    return this.googleAuthService.getGoogleAuthURL();
  }

  @Get('google')
  getGoogleUser(@Res() res: Response, @Req() req: Request) {
    return this.googleAuthService.getGoogleUser(req, res);
  }

  @Get('user/google')
  getCurrentGoogleUser(@Res() res: Response, @Req() req: Request) {
    return this.googleAuthService.getCurrentUser(req, res);
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
  // }
  @Delete('logout')
  logOut(@Res() res: Response) {
    return res.clearCookie('auth_token', { httpOnly: true });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
