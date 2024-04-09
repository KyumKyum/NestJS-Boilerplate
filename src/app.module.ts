import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app/app.config';
import * as process from 'process';
import { PgdbModule } from './config/db/postgres/pgdb.module';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
