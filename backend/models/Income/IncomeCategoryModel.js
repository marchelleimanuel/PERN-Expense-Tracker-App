import { DataTypes } from "sequelize";
import db from "../../database/database.js";

const IncomeCategory = db.define('IncomeCategory', 
    {
        income_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        income_category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: "income_category",
        modelName: 'income_category'
    }
);

export default IncomeCategory;