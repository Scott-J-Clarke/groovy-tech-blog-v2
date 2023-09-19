// Code defines a router object using Express.js Router() function.
// Also imports 'User' model (table) and the 'withAuth' middleware function.
const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// GET request to the root route ('/') using 'withAuth' to ensure user is authenticated before accessing route.
router.get('/', withAuth, async (req, res) => {
    try {
        // Try to retrieve user data ('userData') from the 'User' model using 'findAll()' method.
        // 'password' attribute excluded from retrieved data and orders results by 'name' attribute in ascending order.
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        // Retrieved user data ('userData') then mapped to a plain JavScript object using the 'get' method.
        // Resulting array of objects is assigned to 'users' variable.
        const users = userData.map((project) => project.get({ plain: true }));

        // Renders 'homepage' view, with 'users' array and 'logged_in' property from the session object as data in view.
        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    // If an error occurs, sends a '500' status code and the error message as a JSON response.
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
