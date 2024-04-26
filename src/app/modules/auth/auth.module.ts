import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from './jwt/jwtAuth.module';
import { JwtAuthService } from './jwt/jwtAuth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [UserModule, PassportModule, JwtAuthModule],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
