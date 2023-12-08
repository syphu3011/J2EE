require('dotenv').config();

module.exports = {
  production: {
    username: 'root',
    password: 'handsome3S',
    database: 'j2ee',
    host: '192.168.1.241',
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL',
    timezone: '+07:00',
    logging: false
    // dialectOptions: {
    //   socketPath: '/var/run/mysqld/mysqld.sock'
    // }
  },
  test: {
    username: 'root',
    password: null,
    database: 'j2ee',
    // database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'TEST_DATABASE_URL',
    timezone: '+07:00',
  },
  development: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    timezone: '+07:00',
  },
};