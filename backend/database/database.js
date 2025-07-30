import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false,
// });

// export default db;

const db = new Sequelize(
    process.env.NODE_ENV === "production" ? process.env.DB_PROD_NAME : process.env.DB_NAME,
    process.env.NODE_ENV === "production" ? process.env.DB_PROD_USER : process.env.DB_USER,
    process.env.NODE_ENV === "production" ? process.env.DB_PROD_PASSWORD : process.env.DB_PASSWORD,
    {
        host: process.env.NODE_ENV === "production" ? process.env.DB_PROD_HOST : process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
);

export default db;