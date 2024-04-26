import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../user/model/user.dto';
import { AuthService } from '../auth.service';
import { isErr } from '../../../../common/utils/result/resultTypeGuard';
import { plainToClass } from 'class-transformer';

// const getAuthorizationCookie = () => {
//     return (req: Request): string | undefined => {
//         return req.cookies['Authorization']
//     }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('auth.jwtSecret'),
        });
    }

    async validate(user): Promise<UserDto> {
        const result = await this.authService.validateUserId(user.id);
        if (isErr(result))
            throw new HttpException('Something Gone Wrong during authentication!', HttpStatus.INTERNAL_SERVER_ERROR);
        if (!result.data) throw new HttpException('User Not Authorized.', HttpStatus.UNAUTHORIZED);
        return UserDto.build(user).freeze();
    }
}
