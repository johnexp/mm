var express = require('express');
var router = express.Router();

var ApresentacaoSiteController = require('../../controllers/apresentacao-site.controller');

// Map each API to the Controller Functions
router.get('/', ApresentacaoSiteController.getApresentacaoSite);
router.post('/', ApresentacaoSiteController.createApresentacaoSite);
router.put('/', ApresentacaoSiteController.updateApresentacaoSite);

module.exports = router;