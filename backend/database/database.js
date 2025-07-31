import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.RAILWAY_ENVIRONMENT_NAME === 'production' ? 'Running on production' : 'Running on dev';

const db = new Sequelize(isProd ? process.env.DATABASE_URL : process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    // ini di comment aja klo di local
    // urlPath.jsx juga jangan lupa diubah ke local
    dialectOptions: {
        ssl: {
            require: true,            // 🔐 required on Railway
            rejectUnauthorized: false // ✅ allow self-signed certs
        }
    }
});

export default db;