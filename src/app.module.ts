import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app/app.config';
import * as process from 'process';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: `${process.cwd()}/src/config/env/.${process.env.NODE_ENV}.env`,
            load: [appConfig],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
