import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KafkaClusterService from './kafka.service';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics } from 'kafkajs';

@Injectable()
class KafkaConsumerService implements OnApplicationShutdown {
    constructor(private readonly configService: ConfigService) {}

    private readonly brokers = this.configService.get<string[]>('kafka.brokers');
    private readonly kafka = new KafkaClusterService(this.brokers).kafkaCluster;

    private readonly consumers: Consumer[] = []; //* List to handle consumers

    async consume(topic: ConsumerSubscribeTopics, runConfig: ConsumerRunConfig) {
        const comsumer = this.kafka.consumer({ groupId: 'kafka-group' });
        //* TODO: Consumer's group id need to be different or unique for further parallelism.

        await comsumer.connect();
        await comsumer.subscribe(topic);
        await comsumer.run(runConfig);
        this.consumers.push(comsumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}

export default KafkaConsumerService;
