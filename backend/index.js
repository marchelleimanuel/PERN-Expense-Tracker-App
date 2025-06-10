import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route.js';
import db from './database/database.js';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(router)

try {
    await db.authenticate();
    console.log('Database connect succesfully!');
} catch (error) {
    console.log(error);
}
app.listen(port, async () => {
    console.log(`Application is running on ${port}`);
});