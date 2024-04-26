import {Body, Controller, HttpCode, HttpException, HttpStatus, Post} from "@nestjs/common";
import UserService from "./user.service";
import {CreateUserDto, UserDto} from "./model/user.dto";
import {HashUtils} from "../../../common/utils/hash/hashUtils";
import {isErr} from "../../../common/utils/result/resultTypeGuard";
import {HttpExceptionHandler} from "../../../common/utils/exception/HttpExceptionHandler";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('user')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto):Promise<UserDto> {
        createUserDto.password = await HashUtils.generateHash(createUserDto.password);
        const result = await this.userService.create(createUserDto);

        if(isErr(result)) throw new HttpException("Failed to create user due to input error", HttpStatus.BAD_REQUEST)
        return result.data
    }
}
