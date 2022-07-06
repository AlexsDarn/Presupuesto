const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(_req, email, password, _done) =>{
    const { name } = _req.body;
    const newUser = {
        email,
        password,
        name
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO user SET ?', [newUser]);
    console.log(result);
}));

// passport.serializeUser((usr, done) => {

// });