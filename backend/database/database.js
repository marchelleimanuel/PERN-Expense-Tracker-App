import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false,
// });

// export default db;

const isProd = process.env.RAILWAY_ENVIRONMENT_NAME === 'production';

const db = new Sequelize(isProd ? process.env.DATABASE_URL : process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,            // 🔐 required on Railway
            rejectUnauthorized: false // ✅ allow self-signed certs
        }
    }
});

export default db;