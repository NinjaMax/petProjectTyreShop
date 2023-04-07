import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';

@Module({
  
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({ secret: jwtConstants.secret }),
    UsersModule,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
