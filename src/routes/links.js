const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (_req, _res) => {
    _res.render('balance/add');
});

router.post('/add', (_req, _res) => {
    _res.send('received');
});

module.exports = router;