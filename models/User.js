// Sequelize is a library for interacting with dbs:
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// 'User' class extends 'Model' class (from Sequelize). Define 'User' model with custom methods:
class User extends Model {
    // 'checkPassword()' compares a given password with the hashed password stored in 'User' model:
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        // Attributes define the columns of the 'User' model: 'id', 'username', 'email', and 'password.'
        
        // Define an 'id' column:
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Define a 'username' column:
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define an 'email' column:
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // Define a 'password' column:
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },
    {
        // 'hooks' are functions that execute before or after specific model events.
        // The 'beforeCreate' hook hashes the password before creating a new user:
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = { User };
