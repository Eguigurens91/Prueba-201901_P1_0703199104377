var express = require('express');
var router = express.Router();
var apiPrueba = require('./api/prueba');

router.use('/Prueba',apiPrueba);

module.exports = router;
