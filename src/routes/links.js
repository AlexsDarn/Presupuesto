const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (_req, _res) => {
    _res.render('balance/add');
});

router.post('/add', async (_req, _res) => {
    const {concept, amount, date, type, category} = _req.body;
    const newLink = {
        concept, amount, date, type, category
    };
    await pool.query('INSERT INTO balance set ?', [newLink]);
    _res.redirect('/links');
});

router.get('/', async(_req, _res) => {
    const balance = await pool.query('SELECT *FROM balance');
    _res.render('balance/list', { balance });
});

module.exports = router;