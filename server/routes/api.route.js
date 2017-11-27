var express = require('express');

var router = express.Router();
var users = require('./api/users.route');
var versao = require('./api/versao.route');
var membros = require('./api/membro.route');
var homologacoes = require('./api/homologacao.route');
var apresentacaoSite = require('./api/apresentacao-site.route');
var banners = require('./api/banner.route');
var itemProgresso = require('./api/item-progresso.route');
var wiki = require('./api/wiki.route');
var arquivo = require('./api/arquivo.route');

router.use('/users', users);
router.use('/versoes', versao);
router.use('/membros', membros);
router.use('/homologacaos', homologacoes);
router.use('/apresentacao-site', apresentacaoSite);
router.use('/banneres', banners);
router.use('/item-progresso', itemProgresso);
router.use('/wikis', wiki);
router.use('/arquivos', arquivo);

module.exports = router;