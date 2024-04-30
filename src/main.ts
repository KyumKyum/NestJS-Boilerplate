import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app/app.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import globalValidationOptions from './common/utils/validator/validator.option';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filter/HttpExceptionFilter';
import { DatabaseExceptionFilter } from './common/filter/DatabaseExceptionFilter';
import { LoggingInterceptor } from './common/interceptor/LoggingInterceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swaggerConfig';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableShutdownHooks();
    app.setGlobalPrefix(config.apiPrefix, { exclude: ['/', 'redis-test'] }); //* Add endpoints to exclude the prefix.
    //? Exclude api versioning since versioning is not required for PoC

    app.useGlobalPipes(new ValidationPipe(globalValidationOptions));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //* Interceptors for JSON serialization.
    //* Notable tags: @Exclude(), @Expose()

    //* Swagger
    const doc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, doc);

    //* Interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());

    //* Microservices

    //* Filters
    app.useGlobalFilters(new HttpExceptionFilter(), new DatabaseExceptionFilter());

    //* Middlewares
    app.use(cookieParser());

    console.log(`🚀 The service is running on port ${config.port}`);
    await app.listen(config.port);
}

bootstrap();
