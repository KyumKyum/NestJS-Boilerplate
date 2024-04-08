import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './config/app/app.config';
import * as process from 'process';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableShutdownHooks();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3333);
    console.log(`🚀 The service is running on port ${port}`);
    await app.listen(port);
}

bootstrap();
