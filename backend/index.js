import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route.js';
import db from './database/database.js';
import cors from 'cors';
import Transaction from './models/Transaction/transactionModel.js';
import Expense from './models/Expense/expenseModel.js';
import ExpenseCategory from './models/Expense/expenseCategoryModel.js';
import Income from './models/Income/incomeModel.js';
import IncomeCategory from './models/Income/IncomeCategoryModel.js';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router)


try {
    await db.authenticate();
    // await ExpenseCategory.sync({force: true})
    // await Expense.sync({force: true})
    // await IncomeCategory.sync({force: true})
    // await Income.sync({force: true})
    // await Transaction.sync({force: true})
    console.log('Database connect succesfully!');
} catch (error) {
    console.log(error);
}
app.listen(port, async () => {
    console.log(`Application is running on ${port}`);
});