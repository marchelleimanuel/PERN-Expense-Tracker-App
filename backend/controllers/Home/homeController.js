import { SUCCESS_CODE } from "../../common/common.js";
import Transaction from "../../models/Transaction/transactionModel.js";

export const GetAmountController = async (req, res) => {
    const {id_user} = req.query;

    const transactionById = await Transaction.findAll({
        attributes: ['amount', 'type'],
        where: {
            id_user: id_user
        }
    })

    let expense = 0;
    let income = 0;

    transactionById.map((transaction) => {
        if(transaction.type === 'Income') {
            income += transaction.amount
        }
        else {
            expense += transaction.amount
        }
    })

    const totalMoney = income - expense;

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Get data success',
        data: totalMoney
    })

}