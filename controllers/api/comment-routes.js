const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const dbCommentData = await Comment.create({
                comment_text: req.body.commentText,
                post_id: req.body.postId,
                user_id: req.session.userId
            });
            res.json(dbCommentData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
