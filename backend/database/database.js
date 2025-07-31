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
    // Use a connection URL directly for the pool configuration
const connectionString = process.env.DATABASE_URL; 

const db = new Pool({
    connectionString: connectionString,
    // Optional: Add other pool configuration options like max, idleTimeoutMillis, etc.
    // max: 20, // maximum number of clients in the pool
    // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

export default db;