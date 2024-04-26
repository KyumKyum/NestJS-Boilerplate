import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {LoginUserDto, UserDto} from "../user/model/user.dto";
import {AuthGuard} from "@nestjs/passport";

interface AuthUserRequest extends Request {
    user: UserDto
}

@Controller()
export class AuthController {
    constructor() {}

    @UseGuards(AuthGuard('local'))
    @Post('auth')
    async authUser(@Request() req: AuthUserRequest): Promise<UserDto> {
        return req.user;
    }
}
