import {QueryTypes} from "sequelize";
import db from "../../database/database.js";
import { SUCCESS_CODE } from "../../common/common.js";

const ReportController = async (req, res) => {
    const {id_user} = req.query;

    const getAllReportData = await db.query(
        `select 
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
        where tr.id_user = :id_user`,
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

export default ReportController;