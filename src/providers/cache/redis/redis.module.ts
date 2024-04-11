import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from '../../../config/cache/redis/redis.config';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule.forFeature(redisConfig)],
            useFactory: async (configService: ConfigService) => ({
                type: 'single',
                url: `redis://${configService.get<string>('redis.host')}:${configService.get<number>('redis.port')}`,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class RedisCacheModule {}
