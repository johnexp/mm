var express = require('express');
var router = express.Router();

var ModuleController = require('../controllers/module.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', ModuleController.getModules);
router.get('/id/:id', ModuleController.getModule);
router.get('/:actives?', ModuleController.getAllModules);
router.post('/', ModuleController.createModule);
router.put('/', ModuleController.updateModule);
router.delete('/:id', ModuleController.removeModule);

module.exports = router;