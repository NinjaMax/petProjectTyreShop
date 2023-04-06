import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logIn-dto';
import { SignupDto } from './dto/signUp-dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}

  async findUser(userAuthDto: UserAuthDto) {
    const userIsExist = await this.usersService.findUserByName(
      userAuthDto
    )
    return userIsExist;
  }
  
  async createAccessToken(userAuthDto: UserAuthDto): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign({ sub: userAuthDto.name }) };
  }

  async signup(signupDto: SignupDto): Promise<{ accessToken: string }> {
    if (this.findUser(signupDto.name)) {
      throw new ConflictException(`User with username ${newUser.username} already exists`);
    }
    // const user = {
    //   username: newUser.username,
    //   password: await argon2.hash(newUser.password),
    //   firstName: newUser.firstName,
    //   lastName: newUser.lastName,
    // };
    // this.users.push(user);
    return this.createAccessToken(signupDto.name);
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    try {
      const existingUser = this.findUser(user.name);
      if (!user) {
        throw new Error();
      }
      const passwordMatch = await argon2.verify(existingUser.password, user.password);
      if (!passwordMatch) {
        throw new Error();
      }
      return this.createAccessToken(user.name);
    } catch (e) {
      throw new UnauthorizedException('Username or password may be incorrect. Please try again');
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
