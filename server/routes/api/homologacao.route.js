var express = require('express');
var router = express.Router();

var HomologacaoController = require('../../controllers/homologacao.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', HomologacaoController.getHomologacaos);
router.get('/id/:id', HomologacaoController.getHomologacao);
router.get('/public/id/:id', HomologacaoController.getHomologacao);
router.get('/public', HomologacaoController.getAllHomologacaos);
router.get('/', HomologacaoController.getAllHomologacaos);
router.post('/', HomologacaoController.createHomologacao);
router.put('/', HomologacaoController.updateHomologacao);
router.delete('/:id', HomologacaoController.removeHomologacao);

module.exports = router;