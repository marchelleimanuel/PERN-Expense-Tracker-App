import { DataTypes } from "sequelize";
import db from "../../database/database.js";

const Category = db.define('Category', 
    {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: "category",
        modelName: 'category'
    }
);

export default Category;