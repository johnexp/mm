var express = require('express');
var router = express.Router();

var ItemProgressoController = require('../../controllers/item-progresso.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', ItemProgressoController.getItemProgresso);
router.get('/id/:id', ItemProgressoController.getItemProgresso);
router.get('/', ItemProgressoController.getAllItemProgresso);
router.post('/', ItemProgressoController.createItemProgresso);
router.put('/', ItemProgressoController.updateItemProgresso);
router.delete('/:id', ItemProgressoController.removeItemProgresso);

module.exports = router;