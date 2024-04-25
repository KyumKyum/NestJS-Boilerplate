import BuildableDto from "../lib/buildableDto";

export class UserDto extends BuildableDto{
    id: string;
    ident: string;
    name: string;
    password: string;
}
export class CreateUserDto extends BuildableDto {
    ident: string;
    name: string;
    password: string;
}

export class UpdateUserDto extends BuildableDto {
    ident?: string;
    name?: string;
    password?: string;
}


