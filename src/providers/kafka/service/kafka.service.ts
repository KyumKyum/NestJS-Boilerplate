import { Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

class KafkaClusterService {
    constructor(private readonly brokers: string[] | undefined) {}

    private readonly _kafkaCluster = new Kafka({
        brokers: this.brokers || ['localhost:9093', 'localhost:9094'], //* localhost is a dev feature.
    });

    get kafkaCluster(): Kafka {
        return this._kafkaCluster;
    }
}

export default KafkaClusterService;
