var express = require('express');

var router = express.Router();
var versao = require('./api/versao.route');
var membros = require('./api/membro.route');
var homologacoes = require('./api/homologacao.route');

router.use('/versoes', versao);
router.use('/membros', membros);
router.use('/homologacaos', homologacoes);

module.exports = router;