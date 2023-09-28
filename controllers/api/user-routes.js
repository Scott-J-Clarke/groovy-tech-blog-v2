const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Looks in the User model based on the username given at login:
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If at login user is not in the User model:
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        // Saves session data, including the user ID and login status, to the server:
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

// Use this code for the signup?

// // Checks if password entered at login matches user's hashed password stored in the db:
// const validPassword = userData.checkPassword(req.body.password);

// // Response if password is not valid:
// if (!validPassword) {
//     res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again.' });
//     return;
// }
