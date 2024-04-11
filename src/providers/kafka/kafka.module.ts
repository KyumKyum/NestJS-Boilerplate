import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import KafkaConfig from '../../config/kafka/kafka.config';
import ProducerService from './service/producer.service';
import ConsumerService from './service/consumer.service';

@Module({
    imports: [ConfigModule.forFeature(KafkaConfig)],
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
