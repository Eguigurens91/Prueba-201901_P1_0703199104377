var express = require('express');
var router = express.Router();

var userApi = require('./api/users');
var pruebaApi = require('./api/prueba');

router.user('/users',userApi);
router.use ('/prueba',pruebaApi);

module.exports = router;