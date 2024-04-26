import {Injectable} from "@nestjs/common";
import UserService from "../user/user.service";
import {Result} from "../../../common/utils/result/resultType";
import {UserDto} from "../user/model/user.dto";
import {AuthUserFailedException} from "../../../common/exception/AuthUserFailedException";
import {isErr} from "../../../common/utils/result/resultTypeGuard";
import {ResultStatus} from "../../../common/utils/result/resultStatus";
import {HashUtils} from "../../../common/utils/hash/hashUtils";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(ident: string, password: string): Promise<Result<UserDto | null, AuthUserFailedException>> {
        const found = await this.userService.findByIdent(ident)
        if(isErr(found)) return ResultStatus.err(new AuthUserFailedException()) //! Error: Something gone wrong from userService
        if(!found.data || !await HashUtils.compareHash(password, found.data.password)) return ResultStatus.ok(null) //* Incorrect Information

        return ResultStatus.ok(UserDto.build(found.data).freeze()) //* Auth Completed - User Identified.
    }

}
