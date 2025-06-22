import express from 'express';
import RegisterController from '../controllers/Register/registerController.js';
import LoginController from '../controllers/Login/loginController.js';
import InputController from '../controllers/Input/InputController.js';
import IncomeCategoryController from '../controllers/Input/Category/incomeCategoryController.js';
import ExpenseCategoryController from '../controllers/Input/Category/expenseCategoryController.js';

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);

router.get('/input/category-income', IncomeCategoryController);
router.get('/input/category-expense', ExpenseCategoryController);
router.post('/input/transaction', InputController);


export default router;
