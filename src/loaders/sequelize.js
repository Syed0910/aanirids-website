// loaders/sequelize.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // set to console.log if you want SQL queries logged
  }
);

// ✅ Initialize DB with retries
const initDB = async ({ retries = 5, delay = 2000 } = {}) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully.');
      return true;
    } catch (err) {
      retries -= 1;
      console.error(
        `❌ Database connection failed. ${retries} retries left. Retrying in ${delay}ms...`,
        err.message
      );
      if (!retries) {
        console.error('❌ All retries exhausted. Database connection failed.');
        return false;
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = { sequelize, initDB };
