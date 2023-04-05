import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ){}

  findUser(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }
  
  createAccessToken(username: string): { accessToken: string } {
    return { accessToken: this.jwtService.sign({ sub: username }) };
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { username: user.username, sub: user.userId };
    return result;
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    try {
      const existingUser = this.findUser(user.username);
      if (!user) {
        throw new Error();
      }
      const passwordMatch = await argon2.verify(existingUser.password, user.password);
      if (!passwordMatch) {
        throw new Error();
      }
      return this.createAccessToken(user.username);
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
