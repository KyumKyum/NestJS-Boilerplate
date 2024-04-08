import { Inject, Injectable } from '@nestjs/common';
import appConfig from './config/app/app.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import process from 'process';

@Injectable()
export class AppService {
    constructor(
        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>,
    ) {}
    getHello(): string {
        console.log(this.config.port);
        console.log(new ConfigService().get<number>('PORT'));

        return 'Hello World!';
    }
}
