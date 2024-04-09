import { registerAs } from '@nestjs/config';
import { PgdbConfig } from './pgdb.config.type';
import process from 'process';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import validateConfiguration from '../config.validate';

class PgdbEnvironmentValidator {
    @IsString()
    @IsOptional()
    DB_HOST?: string;

    @IsInt()
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

    @IsBoolean()
    @IsOptional()
    DB_SYNC?: boolean;
}

export default registerAs<PgdbConfig>('pgdb', () => {
    validateConfiguration<PgdbEnvironmentValidator>(process.env, PgdbEnvironmentValidator);

    return {
        type: 'postgres',
        host: process.env.DB_HOST || 'http://localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'PASSWORD',
        database: process.env.DB_DATABASE || 'zkvoting',
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: !!(process.env.DB_SYNC && process.env.DB_SYNC === 'true'),
    };
});
