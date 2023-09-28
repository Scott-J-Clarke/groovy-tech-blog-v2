const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Based on the email provided at login, looks for user in the User model:
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If at login user is not in the User model:
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        // Checks if password entered at login matches user's hashed password stored in the db:
        const validPassword = userData.checkPassword(req.body.password);

        // Response if password is not valid:
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
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

module.exports = router;

// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });
