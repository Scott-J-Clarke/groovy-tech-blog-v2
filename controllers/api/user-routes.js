const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Takes 'username' given at login and looks in the User model: 
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If at login user is not in the User model:
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
        }

        // Saves session data, including the user ID and login status, to the server:
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Login successful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        // Checks that user put in all 3 required fields:
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Please provide username, password, and email.' });
        }

        const existingUser = await User.findOne({ where: { email: req.body.email }});
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const userData = await User.create({ username, password, email });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: "Signup successful!" });
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
