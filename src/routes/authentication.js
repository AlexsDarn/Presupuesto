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
}));

router.get('/signin', (_req, _res) => {
    _res.render('auth/signin');
});

router.post('/signin', (_req, _res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(_req, _res, next);
});

router.get('/profile', (_req, _res) => {
    _res.send('Este es su perfil')
});

module.exports = router;