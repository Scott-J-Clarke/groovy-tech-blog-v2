const router = require('express').Router();
const sequelize = require('../config/connection'); // Is this line needed if 'sequelize' is never read?
const { Post, User, Comment } = require('../models');

// GET info to render homepage ('/') on 'homepage.handlebars':
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const posts = dbPostData.map(post => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    // If the user goes to the '/login' route but is already logged in, the user is redirected to the homepage:
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // If the user is not logged in, the user is sent to the login page:
    res.render('/login');
});

router.get('/signup', (req, res) => {
    // If the user goes to the '/signup' route but is already logged in, the user is redirected to the homepage:
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // If the user is not logged in, the user is sent to the login page:
    res.render('/login');
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id." });
            return;
        }

        // Serialize the data:
        const post = dbPostData.get({ plain: true });

        // Pass data to 'single-post.handlebars':
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;
