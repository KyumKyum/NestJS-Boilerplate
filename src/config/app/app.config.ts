import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { AppConfig } from './app.config.type';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import validateConfiguration from '../config.validate';

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

    @IsUrl({ require_tld: false, require_port: false })
    @IsOptional()
    HOST?: string;
}

export default registerAs<AppConfig>('app', () => {
    validateConfiguration<AppEnvironmentValidator>(process.env, AppEnvironmentValidator);
    return {
        apiPrefix: process.env.API_PREFIX || 'api',
        env: process.env.NODE_ENV || 'development',
        host: process.env.HOST || 'http://localhost',
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3333,
    };
});
