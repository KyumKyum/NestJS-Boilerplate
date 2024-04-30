import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app/app.config';
import * as process from 'process';
import { PgdbModule } from '../infra/db/postgres/pgdb.module';
import { RedisCacheModule } from '../infra/cache/redis/redis.module';
import { RootModule } from './modules/root.module';

const dbInfraModule = PgdbModule; //* This need to be modified if more than one database is required.

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
            load: [appConfig],
        }),
        dbInfraModule,
        RedisCacheModule,
        RootModule,
    ],
    controllers: [AppController],
    providers: [AppService], //* TODO: Remove App Service Later
})
export class AppModule {}
