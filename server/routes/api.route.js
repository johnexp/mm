var express = require('express');

var router = express.Router();
var sascs = require('./api/sascs.route');
var versao = require('./api/versao.route');

router.use('/sascs', sascs);
router.use('/versoes', versao);

module.exports = router;