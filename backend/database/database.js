import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false,
// });

// export default db;

const isProd = process.env.RAILWAY_ENVIRONMENT_NAME === "production";
console.log(isProd);

const db = new Sequelize(
  isProd ? process.env.DB_PROD_NAME : process.env.DB_NAME,
  isProd ? process.env.DB_PROD_USER : process.env.DB_USER,
  isProd ? process.env.DB_PROD_PASSWORD : process.env.DB_PASSWORD,
  {
    host: isProd ? process.env.DB_PROD_HOST : process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

export default db;