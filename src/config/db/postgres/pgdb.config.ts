import { ConfigService, registerAs } from '@nestjs/config';
import { PgdbConfigType } from './pgdb.config.type';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import validateData from '../../../common/utils/validator/validateData';
import * as process from 'process';

class PgdbEnvironmentValidator {
    @IsString()
    @IsOptional()
    DB_HOST?: string;

    @IsInt()
    @Min(3000)
    @Max(65535)
    @IsOptional()
    DB_PORT?: number;

    @IsString()
    @IsOptional()
    DB_USERNAME?: string;

    @IsString()
    @IsOptional()
    DB_PASSWORD?: string;

    @IsString()
    @IsOptional()
    DB_DATABASE?: string;
}

export default registerAs<PgdbConfigType>('pgdb', () => {
    const validatedPgdbConfig = validateData<PgdbEnvironmentValidator>(process.env, PgdbEnvironmentValidator);

    return {
        host: validatedPgdbConfig.DB_HOST || 'localhost',
        port: validatedPgdbConfig.DB_PORT || 6457,
        username: validatedPgdbConfig.DB_USERNAME || 'postgres',
        password: validatedPgdbConfig.DB_PASSWORD || 'postgres',
        database: validatedPgdbConfig.DB_DATABASE || 'database', //Default database name
    };
});
