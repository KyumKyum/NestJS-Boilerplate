import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Partitioners, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import KafkaClusterService from './kafka.service';

@Injectable()
class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
    constructor(private readonly configService: ConfigService) {}

    private readonly brokers = this.configService.get<string[]>('kafka.brokers');
    private readonly kafka = new KafkaClusterService(this.brokers).kafkaCluster;
    private readonly producer: Producer = this.kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
    });

    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async onModuleInit() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}

export default KafkaProducerService;
