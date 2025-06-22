import { DataTypes } from "sequelize";
import db from "../../database/database.js";

const ExpenseCategory = db.define('ExpenseCategory', 
    {
        expense_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        expense_category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: "expense_category",
        modelName: 'expense_category',
        timestamps: false
    }
);

export default ExpenseCategory;