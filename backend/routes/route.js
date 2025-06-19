import express from 'express';
import RegisterController from '../controllers/Register/registerController.js';
import LoginController from '../controllers/Login/loginController.js';
import CategoryController from '../controllers/Input/Category/categoryController.js';

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);

router.get('/input/category', CategoryController)


export default router;
