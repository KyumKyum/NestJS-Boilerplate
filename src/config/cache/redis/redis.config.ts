import { ConfigService, registerAs } from '@nestjs/config';
import { RedisConfigType } from './redis.config.type';
import { IsNumber, IsOptional, IsString, Max, Min, validateSync } from 'class-validator';
import validateData from '../../../utils/validator/validateData';
import * as process from 'process';

class RedisConfigValidator {
    @IsString()
    @IsOptional()
    REDIS_HOST?: string;

    @IsNumber()
    @Min(3000)
    @Max(65535)
    @IsOptional()
    REDIS_PORT?: number;
}

export default registerAs<RedisConfigType>('redis', () => {
    const validatedRedisConfig = validateData<RedisConfigValidator>(process.env, RedisConfigValidator);
    return {
        host: validatedRedisConfig.REDIS_HOST || 'localhost',
        port: validatedRedisConfig.REDIS_PORT || 6379,
    };
});
