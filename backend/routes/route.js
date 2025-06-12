import express from 'express';
import RegisterController from '../controllers/Register/registerController.js';
import LoginController from '../controllers/Login/loginController.js';

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);


export default router;
