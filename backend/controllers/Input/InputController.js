import { SUCCESS_CODE } from "../../common/common.js";

const InputController = (req, res) => {
    const {type, category, amount, date, notes} = req.body;

    const data = {
        type,
        category,
        amount,
        date,
        notes
    }

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        message: 'Data created successfully!',
        data: data
    });

} 

export default InputController;