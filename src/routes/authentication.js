const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (_req, _res) => {
    _res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/profile', (_req, _res) => {
    _res.send('Este es su perfil')
});

module.exports = router;