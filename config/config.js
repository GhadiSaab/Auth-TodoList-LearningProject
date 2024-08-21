const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT, // add port here
    dialect: 'mysql'
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT, // add port here
    dialect: 'mysql'
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_PRODUCTION,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT, // add port here
    dialect: 'mysql'
  }
};
