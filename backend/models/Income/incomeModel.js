import db from "../../database/database.js";
import { DataTypes } from "sequelize";
import IncomeCategory from "./IncomeCategoryModel.js";


const Income = db.define('Income', {
        id_income: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    },
    {
        tableName: "income",
        modelName: "income",
    }
);

IncomeCategory.hasMany(Income, {
    foreignKey: {
        name: 'income_category_id'
    }
})
Income.belongsTo(IncomeCategory);

export default Income;
