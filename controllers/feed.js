const { validationResult } = require('express-validator');
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: '1',
      title: 'First Post',
      content: 'This is the first post!',
      imageUrl: 'images/duck.jpg',
      creator: {
          name: 'Andrey'
      },
      createdAt: new Date()
    }]
  });
};

exports.createPost = (error, req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
      title: 'First Post',
      content: 'This is the first post',
      imageUrl: 'images/duck.jpg',
      creator: {
        name: 'Andrey'
      }
  });
  post.save()
    .then(res => {
      console.log(res);
      res.status(201).json({
        message: 'Post created successfully!',
        post: res
      });
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
