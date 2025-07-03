import {QueryTypes, where} from "sequelize";
import db from "../../database/database.js";
import { SUCCESS_CODE } from "../../common/common.js";
import Transaction from "../../models/Transaction/transactionModel.js";
import User from "../../models/User/userModel.js";
import IncomeCategory from "../../models/Income/IncomeCategoryModel.js";
import ExpenseCategory from "../../models/Expense/expenseCategoryModel.js";
import Income from "../../models/Income/incomeModel.js";
import Expense from "../../models/Expense/expenseModel.js";

export const ReportController = async (req, res) => {
    const {id_user} = req.query;

    const getAllReportData = await db.query(
        `select 
            tr.id_transaction,
            tr.type,
            case 
                when tr.type = 'Income' then ic.income_category_name
                else ec.expense_category_name
            end as category,
            tr.amount,
            tr.date,
            tr.notes
        from transaction tr
        left join expense ex on tr.id_expense = ex.id_expense
        left join expense_category ec on ex.expense_category_id = ec.expense_category_id
        left join income inc on tr.id_income = inc.id_income
        left join income_category ic on ic.income_category_id = inc.income_category_id
        where tr.id_user = :id_user
        order by tr.date desc
        `,
        {
            type: QueryTypes.SELECT,
            replacements: {
                id_user: id_user
            }
        }
    )

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: getAllReportData
    });
}

export const DeleteReportController = async (req, res) => {
    const {id_transaction, type} = req.body;

    let transactionTypeId = null;
    if(type === 'Income') {
        transactionTypeId = await Transaction.findOne({
            attributes: ['id_income'],
            where: {
                id_transaction: id_transaction
            }
        })

        await Income.destroy({
            where: {
                id_income: transactionTypeId.id_income
            }
        })
    }
    else {
        transactionTypeId = await Transaction.findOne({
            attributes: ['id_expense'],
            where: {
                id_transaction: id_transaction
            }
        })

        await Expense.destroy({
            where: {
                id_expense: transactionTypeId.id_expense
            }
        })
    }

    await Transaction.destroy({
        where: {
            id_transaction: id_transaction
        }
    });

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Data deleted successfully!'
    })
}

export const EditReportController = async (req, res) => {
    const {category, amount, date, notes, id_user, id_transaction, type} = req.body;
    console.log(req.body);

    let updatedCategoryId = null;
    let id_income = null;
    let id_expense = null;

    if(type === 'Income') {
        id_income = await Transaction.findOne({
            attributes: ['id_income'],
            where: {
                id_transaction: id_transaction
            }
        })

        updatedCategoryId = await IncomeCategory.findOne({
            attributes: ['income_category_id'],
            where: {
                income_category_name: category
            }
        })
        
        await Income.update(
            {
                income_category_id: updatedCategoryId.income_category_id
            },
            {
                where: {
                    id_income: id_income.id_income
                }
            }
        )

        await Transaction.update(
            {
                amount: amount,
                date: date,
                notes: notes ? notes : ''
            },
            {
                where: {
                    id_transaction: id_transaction,
                    id_user: id_user
                }
            }
        )

    }
    else {
        id_expense = await Transaction.findOne({
            attributes: ['id_expense'],
            where: {
                id_transaction: id_transaction
            }
        })

        updatedCategoryId = await ExpenseCategory.findOne({
            attributes: ['expense_category_id'],
            where: {
                expense_category_name: category
            }
        })
        
        await Expense.update(
            {
                expense_category_id: updatedCategoryId.expense_category_id
            },
            {
                where: {
                    id_expense: id_expense.id_expense
                }
            }
        )

        await Transaction.update(
            {
                amount: amount,
                date: date,
                notes: notes ? notes : ''
            },
            {
                where: {
                    id_transaction: id_transaction,
                    id_user: id_user
                }
            }
        )
    }

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Data edited successfully!'
    });
}