var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var ItemAreaClienteController = require('../controllers/item-area-cliente.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('item-area-cliente:listar'), ItemAreaClienteController.getItemAreaCliente);
router.get('/id/:id', guard.check('item-area-cliente:visualizar'), ItemAreaClienteController.getItemAreaCliente);
router.get('/public/home/', ItemAreaClienteController.getItensHome);
router.get('/public', ItemAreaClienteController.getActives);
router.get('/enum/:field', guard.check('item-area-cliente:listar'), ItemAreaClienteController.getEnumValue);
router.get('/:actives?', guard.check('item-area-cliente:listar'), ItemAreaClienteController.getAllItemAreaCliente);
router.get('/public/:actives', ItemAreaClienteController.getAllItemAreaCliente);
router.post('/', guard.check('item-area-cliente:cadastrar'), ItemAreaClienteController.createItemAreaCliente);
router.put('/', guard.check('item-area-cliente:editar'), ItemAreaClienteController.updateItemAreaCliente);
router.delete('/:id', guard.check('item-area-cliente:ativar/inativar'), ItemAreaClienteController.removeItemAreaCliente);

module.exports = router;