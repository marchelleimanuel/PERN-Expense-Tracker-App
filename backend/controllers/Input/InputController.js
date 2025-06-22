import { SUCCESS_CODE } from "../../common/common.js";
import Transaction from "../../models/Transaction/transactionModel.js";

const InputController = async (req, res) => {
    const {type, category, amount, date, notes} = req.body;

    if(type === '') return res.status(404).json({message: 'Choose type of transaction!'})
    if(category === '') return res.status(404).json({message: 'Choose category!'})
    if(amount === '') return res.status(404).json({message: 'Please input the amount!'})
    if(date === '') return res.status(404).json({message: 'Choose the date!'})
    
    let today = new Date();
    const formattedDate = today.toISOString().split('T');
    const selectedDate = formattedDate[0];
    if(date > selectedDate) return res.status(404).json({message: 'Invalid date: cannot be later than today'})

    const createdTransaction = await Transaction.create({
        type: type,
        category: category,
        amount: amount,
        date: date,
        notes: notes
    })

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Data created successfully!',
        data: createdTransaction
    });

} 

export default InputController;