const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth'); 

router.get('/signup', isNotLoggedIn,(_req, _res) => {
    _res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (_req, _res) => {
    _res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (_req, _res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(_req, _res, next);
});

router.get('/profile', isLoggedIn, (_req, _res) => {
    _res.render('profile');
});

router.get('/logout', (_req, _res, next) => {
    _req.logOut(_req.user, err => {
        if(err) return next(err);
        _res.redirect('/signin');
    });
});

module.exports = router;