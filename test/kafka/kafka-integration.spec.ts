import { Kafka, Partitioners } from 'kafkajs';
import KafkaService from '../../src/infra/kafka/service/kafka.service';

//* KafkaJS Integration test

const SECOND = 1000;

describe('KafkaJS Integration Test: ', () => {
    const kafka = new KafkaService(['localhost:9093', 'localhost:9094']).kafkaCluster;
    const producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
    });
    const consumer = kafka.consumer({ groupId: 'test-group' });

    const testTopic = 'test-topic';

    beforeAll(async () => {
        await producer.connect();
        await consumer.connect();
        await consumer.subscribe({ topic: testTopic, fromBeginning: true });
    }, 60 * SECOND);

    afterAll(async () => {
        await consumer.disconnect();
        await producer.disconnect();
    }, 60 * SECOND);

    it(
        'produces and consumes messages',
        (done) => {
            const testMessage = 'Hello Kafka';

            consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({ topic, partition, message });
                    expect(message.value?.toString()).toBe(testMessage);
                    done();
                },
            });

            producer.send({
                topic: testTopic,
                messages: [{ value: testMessage }],
            });
        },
        60 * SECOND,
    );
});
