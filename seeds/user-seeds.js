const { User } = require('../models'); 

const userData = [
    {
        username: "Shades",
        email: "shadesoakley@gmail.com",
        password: "darksunglasses"  
    },
    {
        username: "Victoria",
        email: "twobagsbetter@hotmail.com",
        password: "highclass21"
    },
    {
        username: "Carp",
        email: "hammerandnails@yahoo.com",
        password: "handymantime"
    }
]
    
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
