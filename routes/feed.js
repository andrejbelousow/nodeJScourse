const router = require('express').Router();

const feedController = require('../controllers/feed');

// GET /feed/posts
router.get('/posts', feedController.getPosts);
// POST /feed/post
router.post('/post', feedController.postPostPost);

module.exports = router;