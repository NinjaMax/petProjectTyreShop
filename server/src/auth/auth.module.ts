import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { GoogleAuthService } from './socialApi/google-auth/google-auth.service';
//import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService],
  imports: [JwtModule.register({ secret: jwtConstants.secret }), UsersModule],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
