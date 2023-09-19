// Code is writing 'login' and 'logout' routes for user authentication using Express.js framework.
// Import the router module from Express.js library and 'User' model (table).
const router = require('express').Router();
const { User } = require('../../models');

// Code block that handles the POST request to the '/login' endpoint:
router.post('/login', async (req, res) => {
    try {
        // Uses the User model (table) to find a user in the db based on the provided email:
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If 'userData' is not found, send a status code (400) and JSON object containing error:
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        // Checks if the provided password matches the hashed password stored in the db for the user:
        const validPassword = await userData.checkPassword(req.body.password);

        // If password is not valid, send a status code (400) and JSON object containing error:
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }
        // This line saves the session data, including the user ID and login status, to the server:
        req.session.save(() => {
            // This line assigns the user ID to the 'user_id' property of the session object:
            req.session.user_id = userData.id;
            // This line sets the 'logged_in' property of the sessio object to 'true.'
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Code block that handles the POST request to the '/logout' endpoint.
router.post('/logout', (req, res) => {
    // This condition checks if the user is logged in. 
    // If they are logged in, it destroys the session and sends a response with a status code of '204.'
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // This sends a status response (404) if the user is NOT logged in.
        res.status(404).end();
    }
});

module.exports = router;
