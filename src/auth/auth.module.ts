import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import LocalStrategy from './passport/local.strategy';

@Module({
    imports: [PassportModule], //* Add required module in here
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
