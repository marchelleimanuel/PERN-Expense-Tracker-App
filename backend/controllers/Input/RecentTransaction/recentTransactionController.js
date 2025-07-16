import { QueryTypes } from "sequelize";
import { SUCCESS_CODE } from "../../../common/common.js";
import db from "../../../database/database.js";

const RecentTransactionController = async (req, res) => {
    const { id_user } = req.query;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    let where = [];
    let replacements = {};

    if(id_user) {
        where.push('id_user = :id_user')
        replacements.id_user = id_user
    }

    if(month) {
        where.push('EXTRACT(MONTH from date) = :month');
        replacements.month = month
    }

    if(year) {
        where.push('EXTRACT(YEAR from date) = :year');
        replacements.year = year
    }

    const whereClause = where.length > 0 ? ` where ${where.join(' AND ')} ` : '';

    const query = `
        select 
            ec.expense_category_name as name,
            sum(tr.amount)::integer as amount
        from transaction tr
        join expense ex on tr.id_expense = ex.id_expense
        join expense_category ec on ec.expense_category_id = ex.expense_category_id
        ${whereClause}
        group by ec.expense_category_name, tr.type
    `

    const data = await db.query(query, {
        replacements,
        type: QueryTypes.SELECT
    });

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: data
    })
}

export default RecentTransactionController;