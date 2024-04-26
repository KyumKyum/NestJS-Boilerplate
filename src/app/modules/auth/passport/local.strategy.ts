import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {LoginUserDto, UserDto} from "../../user/model/user.dto";
import {isErr} from "../../../../common/utils/result/resultTypeGuard";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) { super({
        usernameField: 'ident',
        passwordField: 'password'
    }); }

    async validate(ident: string, password: string): Promise<UserDto> {
        const validationResult = await this.authService.validateUser(ident, password);
        if(isErr(validationResult)) throw new HttpException('Error occurred while validating user', HttpStatus.INTERNAL_SERVER_ERROR)

        const {data: user} = validationResult;
        if(!user) throw new UnauthorizedException()
        return user
    }

}
