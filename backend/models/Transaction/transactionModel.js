import { DataTypes } from "sequelize";
import db from "../../database/database.js";
import User from "../User/userModel.js";
import Expense from "../Expense/expenseModel.js";
import Income from "../Income/incomeModel.js";

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
        data: {
            type: DataTypes.DATE,
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
Transaction.belongsTo(User);

Expense.hasMany(Transaction, {
    foreignKey: 'id_expense',
    type: DataTypes.INTEGER,
    allowNull: true
}); 
Transaction.belongsTo(Expense);

Income.hasMany(Transaction, {
    foreignKey: 'id_income',
    type: DataTypes.INTEGER,
    allowNull: true
}); 
Transaction.belongsTo(Income);


export default Transaction;