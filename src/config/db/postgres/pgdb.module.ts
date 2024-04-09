import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 6457),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'postgres'),
                database: configService.get<string>('DB_DATABASE', 'zkvoting'),
                entities: [process.cwd() + '/src/api/**/*.entity.{ts,js}'],
                synchronize: configService.get<string>('NODE_ENV') === 'development',
                logging: configService.get<string>('NODE_ENV') === 'development',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class PgdbModule {}
