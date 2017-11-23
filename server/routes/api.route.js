var express = require('express');

var router = express.Router();
var versao = require('./api/versao.route');
var membros = require('./api/membro.route');

router.use('/versoes', versao);
router.use('/membros', membros);

module.exports = router;