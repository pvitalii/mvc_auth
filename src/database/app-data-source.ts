import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Country } from '../modules/country/country.entity';
import { User } from '../modules/user/user.entity';
import { createCountriesTable1677270723350 } from './migrations/1677270723350-create-countries-table';
import { createUsersTable1677270767233 } from './migrations/1677270767233-create-users-table';

dotenv.config({ path: process.cwd() + `/${process.env.NODE_ENV}.env` });

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  entities: [User, Country],
  migrations: [createCountriesTable1677270723350, createUsersTable1677270767233],
  migrationsRun: true
};

export const PostgresDataSource = new DataSource(typeOrmConfig);
