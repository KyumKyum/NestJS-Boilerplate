import { Inject, Injectable } from '@nestjs/common';
import appConfig from './config/app/app.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import process from 'process';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AppService {
    constructor(
        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>,

        @InjectRedis() private readonly redis: Redis,
    ) {}
    getHello(): string {
        console.log(this.config.port);
        console.log(new ConfigService().get<number>('PORT'));

        return 'Hello World!';
    }

    async testConnection(): Promise<string | null> {
        await this.redis.set('test_key', 'successful');
        return this.redis.get('test_key');
    }
}
