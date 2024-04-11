import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app/app.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import globalValidationOptions from './utils/validator/validator.option';
import KafkaConsumerService from './providers/kafka/service/consumer.service';
import { TRANSMIT_TRANSACTION } from './constants/topic.constant';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableShutdownHooks();
    app.setGlobalPrefix(config.apiPrefix, { exclude: ['/', 'redis-test'] }); //* Add endpoints to exclude the prefix.
    //* Exclude api versioning since versioning is not required for PoC
    app.useGlobalPipes(new ValidationPipe(globalValidationOptions));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //* Interceptors for JSON serialization.
    //* Notable tags: @Exclude(), @Expose()

    //* Exclude SWAGGER since it is not required for PoC

    //* Kafka
    const kafkaService = app.get(KafkaConsumerService);
    await kafkaService.consume(TRANSMIT_TRANSACTION, {}); //* TODO: Need to add eachMessageLogic after the policy had been made

    console.log(`🚀 The service is running on port ${config.port}`);
    await app.listen(config.port);
}

bootstrap();
