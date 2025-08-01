const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Home page: list all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.render('index', { posts, user: req.user });
});

// Show new post form
router.get('/posts/new', ensureAuth, (req, res) => {
  res.render('newPost');
});

// Handle new post creation
router.post('/posts', ensureAuth, upload.single('image'), async (req, res) => {
  const { title, description, content } = req.body;
  const imagePath = req.file ? '/uploads/' + req.file.filename : '';
  await Post.create({ title, description, content, imagePath, author: req.user._id });
  res.redirect('/');
});

// Delete post
router.post('/posts/:id/delete', ensureAuth, async (req, res) => {
  const p = await Post.findById(req.params.id);
  if (p && p.author.equals(req.user._id)) await Post.deleteOne({ _id: req.params.id });
  res.redirect('/');
});

module.exports = router;
