import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {{
    res.send('halo');
}});

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});