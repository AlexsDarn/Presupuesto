var express = require('express');
var router = express.Router();
const presupuestoController = require("../controllers/presupuestoController");

/* GET home page. */
router.get('/', presupuestoController.index);

module.exports = router;
