import { ConsumerSubscribeTopics } from 'kafkajs';

export const TRANSMIT_TRANSACTION: ConsumerSubscribeTopics = {
    topics: ['TRANSMIT_TRANSACTION'],
    fromBeginning: true, //* Use the earliest offset
};
