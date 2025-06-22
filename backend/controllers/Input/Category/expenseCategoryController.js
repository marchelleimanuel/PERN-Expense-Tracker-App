import { SUCCESS_CODE } from "../../../common/common.js";
import ExpenseCategory from "../../../models/Expense/expenseCategoryModel.js";

const ExpenseCategoryController = async (req, res) => {
    const expenseCategory = await ExpenseCategory.findAll();

    if(expenseCategory) return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: expenseCategory
    });
}

export default ExpenseCategoryController;