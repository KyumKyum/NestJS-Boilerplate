import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LoginUserDto, UserDto } from '../user/model/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JWTSign } from './jwt/jwtAuth.service';
import { UserAuth } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../../../common/guard/jwtAuthGuard';

interface RequestWithPassport extends Request {
    user: UserAuth;
}

@Controller('auth')
export class AuthController {
    constructor() {}

    @UseGuards(AuthGuard('local'))
    @Post('user')
    async authUser(@Request() req: RequestWithPassport, @Res() res: Response) {
        const { user, jwt } = req.user;
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        res.json(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('jwt')
    async isJwtAuthenticated(@Req() req: RequestWithPassport) {
        return req.user;
    }
}
