import BuildableDto from '../../../../common/lib/buildableDto';
import {IsNotEmpty, IsString} from "class-validator";

export class UserDto extends BuildableDto {
    id: string;
    ident: string;
    password: string;
    name: string;
}
export class CreateUserDto extends BuildableDto {
    @IsNotEmpty()
    @IsString()
    ident: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDto extends BuildableDto {
    ident?: string;
    name?: string;
    password?: string;
}
