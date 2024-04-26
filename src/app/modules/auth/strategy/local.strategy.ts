import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {AuthService, UserAuth} from '../auth.service';
import { LoginUserDto, UserDto } from '../../user/model/user.dto';
import { isErr } from '../../../../common/utils/result/resultTypeGuard';
import {JWTSign} from "../jwt/jwtAuth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'ident',
            passwordField: 'password',
        });
    }

    async validate(ident: string, password: string): Promise<UserAuth> {
        const validationResult = await this.authService.validateUserByLocalStrategy(ident, password);
        if (isErr(validationResult))
            throw new HttpException('Error occurred while validating user', HttpStatus.INTERNAL_SERVER_ERROR);

        const { data: userAuth } = validationResult;
        if (!userAuth) throw new UnauthorizedException();
        return userAuth;
    }
}
