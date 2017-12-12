var express = require('express');

var router = express.Router();
var users = require('../src/user/routes/users.route');
var versao = require('../src/versao/routes/versao.route');
var membros = require('../src/membro/routes/membro.route');
var homologacoes = require('../src/homologacao/routes/homologacao.route');
var apresentacaoSite = require('../src/apresentacao-site/routes/apresentacao-site.route');
var sobre = require('../src/sobre/routes/sobre.route');
var banners = require('../src/banner/routes/banner.route');
var itemProgresso = require('../src/item-progresso/routes/item-progresso.route');
var wiki = require('../src/wiki/routes/wiki.route');
var arquivo = require('../src/arquivo/routes/arquivo.route');
var contato = require('../src/contato/routes/contato.route');
var teste = require('../src/teste/routes/teste.route');
var action = require('../src/action/routes/action.route');
var modules = require('../src/module/routes/module.route');
var permission = require('../src/permission/routes/permission.route');

router.use('/users', users);
router.use('/versoes', versao);
router.use('/membros', membros);
router.use('/homologacaos', homologacoes);
router.use('/apresentacao-site', apresentacaoSite);
router.use('/sobre', sobre);
router.use('/banneres', banners);
router.use('/item-progresso', itemProgresso);
router.use('/wikis', wiki);
router.use('/arquivos', arquivo);
router.use('/contato', contato);
router.use('/testes', teste);
router.use('/actions', action);
router.use('/modules', modules);
router.use('/permissions', permission);

module.exports = router;