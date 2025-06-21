import express from 'express';
import RegisterController from '../controllers/Register/registerController.js';
import LoginController from '../controllers/Login/loginController.js';
import CategoryController from '../controllers/Input/Category/categoryController.js';
import InputController from '../controllers/Input/InputController.js';

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);

router.get('/input/category', CategoryController);
router.post('/input/transaction', InputController);


export default router;
