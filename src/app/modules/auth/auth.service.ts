import { Injectable } from '@nestjs/common';
import UserService from '../user/user.service';
import { Result } from '../../../common/utils/result/resultType';
import { UserDto } from '../user/model/user.dto';
import { AuthUserByLocalStrategyFailedException } from '../../../common/exception/AuthUserByLocalStrategyFailedException';
import { isErr } from '../../../common/utils/result/resultTypeGuard';
import { ResultStatus } from '../../../common/utils/result/resultStatus';
import { HashUtils } from '../../../common/utils/hash/hashUtils';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService, JWTSign } from './jwt/jwtAuth.service';
import { AuthUserByIdFailedException } from '../../../common/exception/AuthUserByIdFailedException';

export interface UserAuth {
    user: UserDto;
    jwt: JWTSign;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtAuthService: JwtAuthService,
    ) {}

    async validateUserByLocalStrategy(
        ident: string,
        password: string,
    ): Promise<Result<UserAuth | null, AuthUserByLocalStrategyFailedException>> {
        const found = await this.userService.findByIdent(ident);
        if (isErr(found)) return ResultStatus.err(new AuthUserByLocalStrategyFailedException()); //! Error: Something gone wrong from userService
        if (!found.data || !(await HashUtils.compareHash(password, found.data.password))) return ResultStatus.ok(null); //* Incorrect Information

        const jwt = await this.jwtAuthService.sign(found.data);
        return ResultStatus.ok({ user: found.data, jwt }); //* Auth Completed - User Identified.
    }

    async validateUserId(id: string): Promise<Result<boolean, AuthUserByIdFailedException>> {
        const found = await this.userService.findById(id);
        if (isErr(found)) return ResultStatus.err(new AuthUserByIdFailedException()); //! Error: Something gone wrong from user Service
        return ResultStatus.ok(!!found.data);
    }
}
