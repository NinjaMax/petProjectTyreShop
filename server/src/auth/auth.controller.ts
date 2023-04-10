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
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SignupDto } from './dto/signUp-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/logIn-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@Public()
  //@HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Res() res: Response, @Body() signupDto: SignupDto) {
    const tokenAccess = this.authService.signUp(signupDto);
    res.cookie('cookie_Name', tokenAccess, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });
    return 'Cookie set successfully';
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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



  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
