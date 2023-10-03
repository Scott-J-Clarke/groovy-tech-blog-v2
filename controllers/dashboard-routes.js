const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// 'withAuth' checks user is logged in, then user sees all his own posts:
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'title', 'created_at', 'post_content'],
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
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/create/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'title', 'created_at', 'post_content'],
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
        res.render('create-post', { posts, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
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
            res.status(404).json({ message: 'Can\'t find post with this id.'});
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
