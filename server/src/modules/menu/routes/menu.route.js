var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();

var MenuController = require('../controllers/menu.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('menu:listar'), MenuController.getMenus);
router.get('/id/:id', guard.check('menu:visualizar'), MenuController.getMenu);
router.get('/', guard.check('menu:visualizar'), MenuController.getAllMenus);
router.get('/public/', MenuController.getAllMenus);
router.post('/', guard.check('menu:cadastrar'), MenuController.createMenu);
router.put('/', guard.check('menu:editar'), MenuController.updateMenu);
router.delete('/:id', guard.check('menu:excluir'), MenuController.removeMenu);

module.exports = router;