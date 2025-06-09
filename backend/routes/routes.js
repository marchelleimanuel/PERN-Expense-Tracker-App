import express from 'express';

const router = express.Router();

router.get('/halo', (req, res) => {
    res.send('tes hello world');
});


export default router;
