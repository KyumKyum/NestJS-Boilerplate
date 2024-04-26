import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { AppConfig } from './app.config.type';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import validateData from '../../common/utils/validator/validateData';

enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

class AppEnvironmentValidator {
    @IsString()
    @IsOptional()
    API_PREFIX?: string;

    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV?: Environment;

    @IsInt()
    @Min(3000)
    @Max(65535)
    PORT?: number;

    @IsString()
    @IsOptional()
    HOST?: string;

    @IsString()
    @IsOptional()
    PROTOCOL?: string;
}

export default registerAs<AppConfig>('app', () => {
    const validatedConfig = validateData<AppEnvironmentValidator>(process.env, AppEnvironmentValidator);
    return {
        apiPrefix: validatedConfig.API_PREFIX || 'api',
        env: validatedConfig.NODE_ENV || 'development',
        host: validatedConfig.HOST || 'localhost',
        port: validatedConfig.PORT || 3333,
        protocol: validatedConfig.PROTOCOL || 'http',
    };
});
