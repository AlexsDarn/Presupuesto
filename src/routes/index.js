const express = require('express');
const router = express.Router();

router.get('/', (_req, _res) => {
    _res.send('Hola que pasa');
});

module.exports = router;