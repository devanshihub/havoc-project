// User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // passport‑local‑mongoose will add username & hashed password automatically
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
