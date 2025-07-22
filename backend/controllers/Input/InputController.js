import { SUCCESS_CODE } from "../../common/common.js";
import ExpenseCategory from "../../models/Expense/expenseCategoryModel.js";
import Expense from "../../models/Expense/expenseModel.js";
import IncomeCategory from "../../models/Income/IncomeCategoryModel.js";
import Income from "../../models/Income/incomeModel.js";
import Transaction from "../../models/Transaction/transactionModel.js";


const InputController = async (req, res) => {
    const {type, category, amount, date, notes, id_user} = req.body;
    
    if(type === '') return res.status(404).json({message: 'Choose type of transaction!'})
    if(category === '') return res.status(404).json({message: 'Choose category!'})
    if(amount === '') return res.status(404).json({message: 'Please input the amount!'})
    if(date === '') return res.status(404).json({message: 'Choose the date!'})
    
    let today = new Date();
    const formattedDate = today.toISOString().split('T');
    const selectedDate = formattedDate[0];
    if(date > selectedDate) return res.status(404).json({message: 'Invalid date: cannot be later than today'})
    let data = null;
    if(type === 'Income') {
        const getTypeId = await IncomeCategory.findOne({
            attributes: ['income_category_id'],
            where: {
                income_category_name: category
            }
        })

        const createdIncome = await Income.create({
            income_category_id: getTypeId.income_category_id
        })

        data = await Transaction.create({
            type: type,
            amount: amount,
            date: date,
            notes: notes,
            id_user: id_user,
            id_income: createdIncome.id_income
        });
    }
    else {  
        const getTypeId = await ExpenseCategory.findOne({
            attributes: ['expense_category_id'],
            where: {
                expense_category_name: category
            }
        })

        const createdExpense = await Expense.create({
            expense_category_id: getTypeId.expense_category_id
        })

        data = await Transaction.create({
            type: type,
            amount: amount,
            date: date,
            notes: notes,
            id_user: id_user,
            id_expense: createdExpense.id_expense
        });
    }

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Data created successfully!',
        data: data
    });

} 

export default InputController;