import { QueryTypes } from "sequelize";
import { SUCCESS_CODE } from "../../common/common.js";
import db from "../../database/database.js";
import Transaction from "../../models/Transaction/transactionModel.js";


export const BarChartController = async (req, res) => {
    const { id_user, year } = req.query;

    let where = [];    
    if(id_user) {
        where.push(`id_user = ${id_user}`)
    }
    
    if (year) {
        where.push(`EXTRACT(YEAR FROM date) = ${year}`)
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


    const data = await db.query(query,
    {
        type: QueryTypes.SELECT,
    }
    );
    

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: data
    });
}