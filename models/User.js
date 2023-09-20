const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
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



// // Code block is defining a 'User' model (table) using Sequelize.
// // Sequelize is a Node.js Object-Relational Mapping (ORM) library for interacting with dbs.

// // Line imports dependencies 'Model' and 'DataTypes' from Sequelize:
// const { Model, DataTypes } = require('sequelize');
// // Line imports 'bcrypt' for password hashing:
// const bcrypt = require('bcrypt');
// // 'sequelize' variable is importing the db connection:
// const sequelize = require('../config/connection');

// // User class extends Model class (from Sequelize) letting us define User model with custom methods:
// class User extends Model {
//     // 'checkPassword' method compares a given password with the hashed password stored in 'User' model:
//     checkPassword(loginPw) {
//         return bcrypt.compareSync(loginPw, this.password);
//     }
// }

// // Initializes the 'User' model with specificed 'attributes' and 'options':
// User.init(
//     // Attributes define the columns of the 'User' model: id, name, email, and password.
//     // Each attribute has specified data type, allowNull property, and validations ('isEmail' and 'len').
//     {
//         // Define an 'id' column:
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         // Define a 'username' column:
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         // Define an 'email' column:
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//             },
//         },
//         // Define a 'password' column:
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [4],
//             },
//         },
//     },
//     // Options includes 'hooks.' hooks are functions that execute before or after specific model events.
//     // In this case, the 'beforeCreate' hook is used to hash the password before creating a new user.
//     {
//         hooks: {
//             beforeCreate: async (newUserData) => {
//                 newUserData.password = await bcrypt.hash(newUserData.password, 10);
//                 return newUserData;
//             },
//         },
//         // These are other 'options':
//         sequelize, // The Sequelize connection
//         timestamps: false, // Disables timestamps
//         freezeTableName: true,
//         underscored: true, // Setting the table name to 'user'
//         modelName: 'user', // Setting the model name to 'user'
//     }
// );

// module.exports = User;
