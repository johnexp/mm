var express = require('express')
var router = express.Router()

// Getting the Versao Controller that we just created
var VersaoController = require('../../controllers/versao.controller');

// Map each API to the Controller FUnctions
router.post('/filter/*?', VersaoController.getVersoes);
router.get('/public/id/:id', VersaoController.getVersao);
router.get('/id/:id', VersaoController.getVersao);
router.get('/public', VersaoController.getAllVersoes);
router.get('/', VersaoController.getAllVersoes);
router.post('/', VersaoController.createVersao);
router.put('/', VersaoController.updateVersao);
router.delete('/:id', VersaoController.removeVersao);

// Export the Router
module.exports = router;