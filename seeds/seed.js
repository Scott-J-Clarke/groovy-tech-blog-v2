// Import Sequelize object:
const sequelize = require('../config/connection');
// Import 'User' model, which represents the 'User' table in the database:
const { User } = require('../models');

// Import user data as array of objects, where each object is a user and their associated data (email, password, etc.):
const userData = require('./userData.json');

// Function that seeds 'user_db':
const seedDatabase = async () => {
    // Synchronizes 'schema.sql' with 'User' model. 
    // 'sync' method creates creates tables in database based on models.
    // '({ force: true })' drops any tables with the existing name and recreates them:
    await sequelize.sync({ force: true });

    // 'bulkCreate' is a method provided by Sequelize to add a lot of records to 'User' table:
    await User.bulkCreate(userData, {
        // This enables the execution of any defined 'hooks' for each user and return the created user objects:
        individualHooks: true,
        returning: true,
    });
    
    // Exits Node.js with a status code of '0', indicating successful execution:
    process.exit(0);
};

// Calls the 'seedDatabase' function to start the seeding process:
seedDatabase();
