var express = require('express');
var router = express.Router();

var ArquivoController = require('../../controllers/arquivo.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', ArquivoController.getArquivos);
router.get('/id/:id', ArquivoController.getArquivo);
router.get('/', ArquivoController.getAllArquivos);
router.post('/', ArquivoController.createArquivo);
router.put('/', ArquivoController.updateArquivo);
router.delete('/:id', ArquivoController.removeArquivo);

module.exports = router;