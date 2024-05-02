import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import pgdbConfig from '../../../config/db/postgres/pgdb.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(pgdbConfig)],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('pgdb.host'),
                port: configService.get<number>('pgdb.port'),
                username: configService.get<string>('pgdb.username'),
                password: configService.get<string>('pgdb.password'),
                database: configService.get<string>('pgdb.database'),
                entities: [`${process.cwd()}/dist/app/**/*.entity.{ts,js}`],
                synchronize: false, //configService.get<string>('NODE_ENV') === 'development',
                logging: configService.get<string>('NODE_ENV') === 'development',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class PgdbModule {}
