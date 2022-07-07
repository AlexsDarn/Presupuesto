const express = require('express');
const router = express.Router();

router.get('/', (_req, _res) => {
    _res.render('index');
});

module.exports = router;