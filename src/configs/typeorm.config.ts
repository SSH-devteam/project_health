import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'docker-test-password',
    database: 'p_health',
    entities: [__dirname + '/../entity/*.entity.{js,ts}'],
    synchronize: true,
    autoLoadEntities: true,

    // type: dbConfig.type,
    // host: dbConfig.host,
    // port: dbConfig.port,
    // username: dbConfig.username,
    // password: dbConfig.password,
    // database: dbConfig.database,
    // entities: [__dirname + '/../entity/*.entity.{js,ts}'],
    // synchronize: true,
    // autoLoadEntities: true,
};
