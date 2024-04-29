import BuildableDto from '../../../../common/lib/buildableDto';
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from 'class-validator';

export class UserDto extends BuildableDto {
    @IsNotEmpty()
    @IsString()
    id: string = '';

    @IsNotEmpty()
    @IsString()
    ident: string = '';

    @IsNotEmpty()
    @IsString()
    password: string = '';

    @IsNotEmpty()
    @IsString()
    name: string = '';

    @IsNotEmpty()
    @IsString()
    country: string = ''

    @IsNotEmpty()
    @IsString()
    phoneNum: string = ''

    @IsNotEmpty()
    @IsEmail()
    email: string = ''
}

export class LoginUserDto extends BuildableDto {
    @IsNotEmpty()
    @IsString()
    ident: string = '';

    @IsNotEmpty()
    @IsString()
    password: string = '';
}
export class CreateUserDto extends BuildableDto {
    @IsNotEmpty()
    @IsString()
    ident: string = '';

    @IsNotEmpty()
    @IsString()
    name: string = '';

    @IsNotEmpty()
    @IsString()
    password: string = '';

    @IsNotEmpty()
    @IsString()
    country: string = ''

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNum: string = ''


    @IsNotEmpty()
    @IsEmail()
    email: string = ''
}

export class UpdateUserDto extends BuildableDto {
    ident?: string = '';
    name?: string = '';
    password?: string = '';
}
