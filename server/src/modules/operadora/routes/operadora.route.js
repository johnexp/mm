var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var OperadoraController = require('../controllers/operadora.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('operadora:listar'), OperadoraController.getOperadoras);
router.get('/id/:id', guard.check('operadora:visualizar'), OperadoraController.getOperadora);
router.get('/:actives?', guard.check('operadora:visualizar'), OperadoraController.getAllOperadoras);
router.post('/', guard.check('operadora:cadastrar'), OperadoraController.createOperadora);
router.put('/', guard.check('operadora:editar'), OperadoraController.updateOperadora);
router.delete('/:id', guard.check('operadora:ativar/inativar'), OperadoraController.removeOperadora);

module.exports = router;