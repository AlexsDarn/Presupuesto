module.exports = {
    isLoggedIn(_req, _res, next){
        if (_req.isAuthenticated()) {
            return next();
        }
        return _res.redirect('/signin');
    },

    isNotLoggedIn(_req, _res, next){
        if (!_req.isAuthenticated()) {
            return next();
        }
        return _res.redirect('/profile');
    }
};