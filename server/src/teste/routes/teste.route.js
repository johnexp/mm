var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var TesteController = require('../controllers/teste.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('teste:listar'), TesteController.getTestes);
router.get('/id/:id', guard.check('teste:visualizar'), TesteController.getTeste);
router.get('/enum/:field', guard.check('teste:visualizar'), TesteController.getEnumValue);
router.get('/:actives?', guard.check('teste:visualizar'), TesteController.getAllTestes);
router.post('/', guard.check('teste:cadastrar'), TesteController.createTeste);
router.put('/', guard.check('teste:editar'), TesteController.updateTeste);
router.delete('/:id', guard.check('teste:ativar/inativar'), TesteController.removeTeste);

module.exports = router;