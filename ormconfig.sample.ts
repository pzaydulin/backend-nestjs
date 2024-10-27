import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  dropSchema: false,
  synchronize: true,
  migrationsRun: false,
  logging: true,
  migrations: ['dist/src/**/db/migrations/*{.ts,.js}'],
};

// connectionSource
//   .initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
