var express = require('express');
var router = express.Router();

var ApresentacaoPlanosController = require('../controllers/apresentacao-planos.controller');

// Map each API to the Controller Functions
router.get('/public/', ApresentacaoPlanosController.getApresentacaoPlanos);
router.get('/', ApresentacaoPlanosController.getApresentacaoPlanos);
router.post('/', ApresentacaoPlanosController.createApresentacaoPlanos);
router.put('/', ApresentacaoPlanosController.updateApresentacaoPlanos);

module.exports = router;