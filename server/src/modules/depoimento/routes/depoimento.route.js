var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var DepoimentoController = require('../controllers/depoimento.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('depoimento:listar'), DepoimentoController.getDepoimentos);
router.get('/id/:id', guard.check('depoimento:visualizar'), DepoimentoController.getDepoimento);
router.get('/', guard.check('depoimento:visualizar'), DepoimentoController.getAllDepoimentos);
router.get('/public', DepoimentoController.getAllDepoimentos);
router.post('/', guard.check('depoimento:cadastrar'), DepoimentoController.createDepoimento);
router.put('/', guard.check('depoimento:editar'), DepoimentoController.updateDepoimento);
router.delete('/:id', guard.check('depoimento:excluir'), DepoimentoController.removeDepoimento);

module.exports = router;