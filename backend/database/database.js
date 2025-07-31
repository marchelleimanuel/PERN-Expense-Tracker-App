import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

let db = null;
if(process.env.ENV_NAME === 'production') {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,            // 🔐 required on Railway
                rejectUnauthorized: false // ✅ allow self-signed certs
            }
        }
    });
}
else {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
    });
}

export default db;