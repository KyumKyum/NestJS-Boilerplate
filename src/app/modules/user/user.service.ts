import {Injectable, Res} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto, UserDto} from './model/user.dto';
import { Result } from '../../../common/utils/result/resultType';
import { DataCreateFailedException } from '../../../common/exception/DataCreateFailedException';
import { ResultStatus } from '../../../common/utils/result/resultStatus';
import {DataFindFailedException} from "../../../common/exception/DataFindFailedException";

@Injectable()
class UserService {
    constructor(
        @InjectRepository(User)
        private user: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<Result<UserDto, DataCreateFailedException>> {
        try {
            const user = await this.user.create(createUserDto);
            const saved = await this.user.save(user)
            return ResultStatus.ok(UserDto.build(saved).freeze());
        } catch (e) {
            return ResultStatus.err(
                new DataCreateFailedException(`Error occurred while creating user: ${printException(e)}`),
            );
        }
    }

    async find(id: string): Promise<Result<UserDto | null, DataFindFailedException>> {
        try {
            const user = await this.user.findOne({where:{id}})
            if(user === null) return ResultStatus.ok(null)
            return ResultStatus.ok(UserDto.build(user).freeze())
        }catch (e){
            return ResultStatus.err(
                new DataFindFailedException(`Error occurred while finding user: ${printException(e)}`)
            )
        }
    }
}

export default UserService;
