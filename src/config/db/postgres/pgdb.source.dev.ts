import { config } from 'dotenv';
import * as process from 'process';
import { DataSource } from 'typeorm';
import * as path from 'path';

const envPath = path.resolve(process.cwd() + '/src/config/env/.env.development');

config({ path: envPath });

const pdgbDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${process.cwd()}/dist/app/**/*.entity.{ts,js}`],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    migrations: ['src/_migrations/pgdb/dev/*.ts'],
    migrationsTableName: '_migrations',
    migrationsRun: true,
});

export default pdgbDataSource;
