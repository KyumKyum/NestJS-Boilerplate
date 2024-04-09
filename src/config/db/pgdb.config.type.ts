export type PgdbConfig = {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: [string];
    synchronize: boolean;
};
