import { DataTypes } from "sequelize";
import db from "../../database/database.js";

const User = db.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "app_user",
        modelName: 'users'
    }
);

export default User;