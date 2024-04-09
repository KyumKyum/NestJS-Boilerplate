import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app/app.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import globalValidationOptions from './utils/validation.option';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableShutdownHooks();
    app.setGlobalPrefix(config.apiPrefix, { exclude: ['/'] }); //* Add endpoints to exclude the prefix.
    //* Exclude api versioning since versioning is not required for PoC
    app.useGlobalPipes(new ValidationPipe(globalValidationOptions));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //* Interceptors for JSON serialization.
    //* Notable tags: @Exclude(), @Expose()

    //* Exclude SWAGGER since it is not required for PoC

    console.log(`🚀 The service is running on port ${config.port}`);
    await app.listen(config.port);
}

bootstrap();