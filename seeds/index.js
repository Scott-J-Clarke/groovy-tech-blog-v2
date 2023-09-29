const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json')
const postData = require('./post.json');
const commentData = require('./comment.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });
        console.log('\n----- USERS SEEDED -----\n');

        await Post.bulkCreate(postData);
        console.log('\n----- POSTS SEEDED -----\n');

        await Comment.bulkCreate(commentData);
        console.log('\n----- COMMENTS SEEDED -----\n');

        process.exit(0); // 'process.exit' is a method to terminate Node.js process. '0' is a successful exit.
    } catch (err) {
        console.error('Error seeding database', err);
        process.exit(1); // Exit with an error code.
    }
};

seedDatabase();
