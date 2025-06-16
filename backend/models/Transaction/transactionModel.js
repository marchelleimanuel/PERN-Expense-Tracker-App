import { DataTypes } from "sequelize";
import db from "../../database/database.js";
import User from "../User/userModel.js";
import Category from "../Category/categoryModel.js";

const Transaction = db.define('Transaction', 
    {
        id_transaction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "transaction",
        modelName: 'transaction'
    }
);

// Relationship
User.hasMany(Transaction, {
    foreignKey: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
});
Category.hasMany(Transaction, {
    foreignKey: 'id_category',
    type: DataTypes.INTEGER,
    allowNull: false
}); 


export default Transaction;