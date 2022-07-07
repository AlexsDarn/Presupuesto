const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (_req, _res) => {
    _res.render('balance/add');
});

router.post('/add', isLoggedIn, async (_req, _res) => {
    const {concept, amount, date, type, category} = _req.body;
    const newLink = {
        concept, amount, date, type, category, 
        user_id: _req.user.id_user
    };
    await pool.query('INSERT INTO balance set ?', [newLink]);
    _req.flash('success', 'Presupuesto agregado correctamente');
    _res.redirect('/links');
});

router.get('/', isLoggedIn, async(_req, _res) => {
    const balance = await pool.query('SELECT * FROM balance WHERE user_id = ?', [_req.user.id_user]);
    _res.render('balance/list', { balance });
});

router.get('/delete/:id', isLoggedIn, async (_req, _res) => {
    const { id } = _req.params;
    await pool.query('DELETE FROM balance WHERE id_balance = ?', [id]);
    _req.flash('success', 'Presupuesto eliminado correctamente');
    _res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (_req, _res) => {
    const { id } = _req.params;
    const balance = await pool.query('SELECT * FROM balance WHERE id_balance = ?', [id]);
    _res.render('balance/edit', {balance: balance[0]});
});

router.post('/edit/:id', isLoggedIn, async (_req, _res) => {
    const { id } = _req.params;
    const {concept, amount, date, type, category} = _req.body;
    const newLink = {
        concept, amount, date, type, category
    };
    await pool.query('UPDATE balance set ? WHERE id_balance = ?', [newLink, id]);
    _req.flash('success', 'Presupuesto editado correctamente');
    _res.redirect('/links');
})

module.exports = router;