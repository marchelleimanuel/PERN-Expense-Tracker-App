import { SUCCESS_CODE } from "../../../common/common.js";
import Category from "../../../models/Category/categoryModel.js";

const CategoryController = async (req, res) => {
    const categories = await Category.findAll();

    if(categories) return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: categories
    });
}

export default CategoryController;