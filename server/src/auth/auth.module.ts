import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { GoogleAuthService } from './socialApi/google-auth.service';
import { CustomersModule } from '../customers/customers.module';
import { FacebookAuthService } from './socialApi/facebook-auth.service';
import { TwitterAuthService } from './socialApi/twitter-auth.service';
//import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleAuthService,
    FacebookAuthService,
    TwitterAuthService,
  ],
  imports: [
    JwtModule.register({ secret: jwtConstants.secret }),
    UsersModule,
    CustomersModule,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
