import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import { KafkaConfigType } from './kafka.config.type';
import validateData from '../../common/utils/validator/validateData';
import * as process from 'process';

class KafkaConfigValidator {
    @IsString()
    @IsOptional()
    KAFKA_HOST?: string;

    @IsString()
    @IsOptional()
    KAFKA_BROKERS?: string;
}

export default registerAs<KafkaConfigType>('kafka', () => {
    const validatedKafkaConfig = validateData<KafkaConfigValidator>(process.env, KafkaConfigValidator);

    const brokers: string = validatedKafkaConfig.KAFKA_BROKERS || 'localhost:9093, localhost:9094';
    const brokerArray: string[] = brokers.split(',').map((broker) => broker.trim());

    return {
        host: validatedKafkaConfig.KAFKA_HOST || 'localhost',
        brokers: brokerArray,
    };
});
