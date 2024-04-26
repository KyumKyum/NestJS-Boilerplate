import { IsNotEmpty, IsString } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { AuthConfigType } from './auth.config.type';
import validateData from '../../common/utils/validator/validateData';
import * as process from 'process';

class AuthEnvironmentValidator {
    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;
}

export default registerAs<AuthConfigType>('auth', () => {
    const validatedConfig = validateData<AuthEnvironmentValidator>(process.env, AuthEnvironmentValidator);

    return {
        jwtSecret: validatedConfig.JWT_SECRET,
    };
});
