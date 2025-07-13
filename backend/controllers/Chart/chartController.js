import { QueryTypes } from "sequelize";
import { SUCCESS_CODE } from "../../common/common.js";
import db from "../../database/database.js";
import Transaction from "../../models/Transaction/transactionModel.js";


export const BarChartController = async (req, res) => {
    const { id_user, year, month } = req.query;

    let where = [];    
    let replacements = {};

    if(id_user) {
        where.push(`id_user = :id_user`);
        replacements.id_user = id_user;
    }
    
    if (year) {
        where.push(`EXTRACT(YEAR FROM date) = :year`);
        replacements.year = year;
    }
    else {
        where.push(`EXTRACT(YEAR FROM date) = :year`);
        replacements.year = '2025';
    }

    if (month) {
        where.push(`EXTRACT(MONTH FROM date) = :month`);
        replacements.month = month;
    }

    const whereClause = where.length > 0 ? ` AND ${where.join(' AND ')} ` : '';

    const query = `
        WITH months AS (
            SELECT generate_series(1, 12) AS month
        ),
        monthly_income AS (
            SELECT
                EXTRACT(MONTH FROM date) AS month,
                SUM(amount) AS total
            FROM transaction
            WHERE type = 'Income' ${whereClause}
            GROUP BY EXTRACT(MONTH FROM date)
        ),
        monthly_expense AS (
            SELECT
                EXTRACT(MONTH FROM date) AS month,
                SUM(amount) AS total
            FROM transaction
            WHERE type = 'Expense' ${whereClause}
            GROUP BY EXTRACT(MONTH FROM date)
        )
        SELECT
            CASE m.month
                WHEN 1 THEN 'Jan'
                WHEN 2 THEN 'Feb'
                WHEN 3 THEN 'Mar'
                WHEN 4 THEN 'Apr'
                WHEN 5 THEN 'May'
                WHEN 6 THEN 'Jun'
                WHEN 7 THEN 'Jul'
                WHEN 8 THEN 'Aug'
                WHEN 9 THEN 'Sep'
                WHEN 10 THEN 'Oct'
                WHEN 11 THEN 'Nov'
                WHEN 12 THEN 'Dec'
            END AS month,
            COALESCE(mi.total, 0) AS income,
            COALESCE(me.total, 0) AS expense
        FROM months m
        LEFT JOIN monthly_income mi ON m.month = mi.month
        LEFT JOIN monthly_expense me ON m.month = me.month
        ORDER BY m.month;
    `


    const monthlyIncomeAndExpense = await db.query(query,
    {
        type: QueryTypes.SELECT,
        replacements
    }
    );
    

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: monthlyIncomeAndExpense
    });
}

export const ExpensePieChartController = async (req, res) => {
    const { id_user, year, month } = req.query;

    let replacements = {};
    let where = []

    if(id_user) {
        where.push('id_user = :id_user');
        replacements.id_user = id_user
    }

    if (year) {
        where.push(`EXTRACT(YEAR FROM date) = :year`);
        replacements.year = year;
    }

    if (month) {
        where.push(`EXTRACT(MONTH FROM date) = :month`);
        replacements.month = month;
    }


    const whereClause = where.length > 0 ? `where ${where.join(' AND ')}` : '';

    const query = `
        select 
            ec.expense_category_name as name,
            sum(tr.amount)::integer as amount,
            tr.type
        from transaction tr
        join expense ex on tr.id_expense = ex.id_expense
        join expense_category ec on ec.expense_category_id = ex.expense_category_id
        ${whereClause}
        group by ec.expense_category_name, tr.type
    `

    const expensePerCategory = await db.query(query, {
        type: QueryTypes.SELECT,
        replacements,
    })

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: expensePerCategory
    })


}

export const IncomePieChartController = async (req, res) => {
    const { id_user, year, month } = req.query;

    let replacements = {};
    let where = []

    if(id_user) {
        where.push('id_user = :id_user');
        replacements.id_user = id_user
    }

    if (year) {
        where.push(`EXTRACT(YEAR FROM date) = :year`);
        replacements.year = year;
    }

    if (month) {
        where.push(`EXTRACT(MONTH FROM date) = :month`);
        replacements.month = month;
    }

    const whereClause = where.length > 0 ? `where ${where.join(' AND ')}` : '';

    const query = `
        select 
            ec.income_category_name as name,
            sum(tr.amount)::integer as amount,
            tr.type
        from transaction tr
        join income ex on tr.id_income = ex.id_income
        join income_category ec on ec.income_category_id = ex.income_category_id
        ${whereClause}
        group by ec.income_category_name, tr.type
    `

    const incomePerCategory = await db.query(query, {
        type: QueryTypes.SELECT,
        replacements,
    })

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: incomePerCategory
    })


}