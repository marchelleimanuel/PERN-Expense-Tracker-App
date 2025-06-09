import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import db from './database/database.js';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(router)
app.use(express.json());

app.listen(port, async () => {
    try {
        await db.authenticate();
        console.log('Database connect succesfully!');
    } catch (error) {
        console.log(error);
    }
    console.log(`Application is running on ${port}`);
});