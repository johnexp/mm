var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var AssuntoContatoController = require('../controllers/assunto-contato.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('assunto-contato:listar'), AssuntoContatoController.getAssuntoContato);
router.get('/id/:id', guard.check('assunto-contato:visualizar'), AssuntoContatoController.getAssuntoContato);
router.get('/', guard.check('assunto-contato:listar'), AssuntoContatoController.getAllAssuntoContato);
router.get('/public', AssuntoContatoController.getAllAssuntoContato);
router.post('/', guard.check('assunto-contato:cadastrar'), AssuntoContatoController.createAssuntoContato);
router.put('/', guard.check('assunto-contato:editar'), AssuntoContatoController.updateAssuntoContato);
router.delete('/:id', guard.check('assunto-contato:excluir'), AssuntoContatoController.removeAssuntoContato);

module.exports = router;