const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  try {
    await User.register(new User({ username: req.body.username }), req.body.password);
    passport.authenticate('local')(req, res, () => res.redirect('/'));
  } catch (err) {
    res.render('register', { error: err.message });
  }
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/logout', (req, res, next) => req.logout(err => { if (err) return next(err); res.redirect('/'); }));

module.exports = router;
