import express from 'express';
import RegisterController from '../controllers/Register/registerController.js';
import LoginController from '../controllers/Login/loginController.js';
import InputController from '../controllers/Input/InputController.js';
import IncomeCategoryController from '../controllers/Input/Category/incomeCategoryController.js';
import ExpenseCategoryController from '../controllers/Input/Category/expenseCategoryController.js';
import { DeleteReportController, EditReportController, ReportController } from '../controllers/Report/reportController.js';
import { GetAmountController } from '../controllers/Home/homeController.js';
import { BarChartController, ExpensePieChartController, IncomePieChartController } from '../controllers/Chart/chartController.js';
import { GetDayController, GetMonthController, GetYearController } from '../controllers/Utility/utilityController.js';

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);

router.get('/home/amount', GetAmountController);

router.get('/input/category-income', IncomeCategoryController);
router.get('/input/category-expense', ExpenseCategoryController);
router.post('/input/transaction', InputController);

router.get('/report',  ReportController);
router.delete('/report/delete', DeleteReportController);
router.patch('/report/edit', EditReportController);

router.get('/chart/total-expense-income', BarChartController);
router.get('/chart/expense-per-category', ExpensePieChartController);
router.get('/chart/income-per-category', IncomePieChartController);

router.get('/year', GetYearController);
router.get('/month', GetMonthController);
router.get('/day', GetDayController);


export default router;
