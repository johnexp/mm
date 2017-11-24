var express = require('express');

var router = express.Router();
var versao = require('./api/versao.route');
var membros = require('./api/membro.route');
var homologacoes = require('./api/homologacao.route');
var apresentacaoSite = require('./api/apresentacao-site.route');
var banners = require('./api/banner.route');

router.use('/versoes', versao);
router.use('/membros', membros);
router.use('/homologacaos', homologacoes);
router.use('/apresentacao-site', apresentacaoSite);
router.use('/banneres', banners);

module.exports = router;