import express from 'express';
import registerController from '../controllers/Register/registerController.js';

const router = express.Router();

router.post('/register', registerController);
// router.post('/login', )


export default router;
