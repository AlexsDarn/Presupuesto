const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(_req, email, password, done)=> {
    const rows = await pool.query('SELECT * FROM user WHERE email = ?', [email])
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, _req.flash('success', 'Bienvenido ' + user.email));
        }else{
            done(null, false, _req.flash('message', 'Contraseña incorrecta'));
        }
    }else{
        return done (null, false, _req.flash('message', 'El correo no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (_req, email, password, done) => {
    const { name } = _req.body;
    let newUser = {
        name,
        email,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO user SET ?', [newUser]);
    newUser.id_user = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id_user);
});

passport.deserializeUser(async(id_user, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE id_user = ?', [id_user]);
    done(null, rows[0]);
});