// Post.js
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  content: String,
  imagePath: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);
