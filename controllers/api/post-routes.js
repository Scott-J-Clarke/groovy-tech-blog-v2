const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
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
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({ where: { id: req.params.id },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ] 
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'Can\'t find post with this id.' });
            return;
        }

        res.json(dbPostData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.postTitle,
            post_content: req.body.postContent,
            user_id: req.session.userId
        });
        res.json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                post_content: req.body.postContent
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!dbPostData) {
            res.status(404).json({ message: 'Can\'t find post with this id.' });
            return;
        }

        res.json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {        
        const dbPostData = await Post.destroy({
            where: { id: req.params.id }
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'Can\'t find post with this id.' });
            return;
        }

        res.json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
