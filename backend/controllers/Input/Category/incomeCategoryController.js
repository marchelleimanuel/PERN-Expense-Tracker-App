import { SUCCESS_CODE } from "../../../common/common.js";
import IncomeCategory from "../../../models/Income/IncomeCategoryModel.js";

const IncomeCategoryController = async (req, res) => {
    const incomeCategories = await IncomeCategory.findAll();

    if(incomeCategories) return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: incomeCategories
    });
}

export default IncomeCategoryController;