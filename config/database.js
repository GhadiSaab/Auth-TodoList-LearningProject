require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('DB Host:', process.env.DATABASE_HOST);
console.log('DB User:', process.env.DATABASE_USER);
console.log('DB Name:', process.env.DATABASE_DEVELOPMENT);

const sequelize = new Sequelize(
  process.env.DATABASE_DEVELOPMENT,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT, 
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
