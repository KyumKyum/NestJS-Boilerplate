import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./user.dto";
import {Result} from "../../utils/result/resultType";
import {DataCreateFailedException} from "../../exception/DataCreateFailedException";
import {ResultStatus} from "../../utils/result/resultStatus";

@Injectable()
class UserService {
    constructor(
        @InjectRepository(User)
        private user: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDto):Promise<Result<boolean, DataCreateFailedException>> {
        try{
            const user = await this.user.create(createUserDto);
            if(user == null) return ResultStatus.err(new DataCreateFailedException('Failed to create current user.'))
            return ResultStatus.ok(true)
        }catch (e){
            return ResultStatus.err(new DataCreateFailedException(`Error occurred while creating user: ${printError(e)}`))
        }
    }
}

export default UserService
