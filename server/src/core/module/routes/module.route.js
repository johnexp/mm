var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var ModuleController = require('../controllers/module.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, ModuleController.getModules);
router.get('/id/:id', RoleValidation.validateRole, ModuleController.getModule);
router.get('/:actives?', RoleValidation.validateRole, ModuleController.getAllModules);
router.post('/', RoleValidation.validateRole, ModuleController.createModule);
router.put('/', RoleValidation.validateRole, ModuleController.updateModule);
router.delete('/:id', RoleValidation.validateRole, ModuleController.removeModule);

module.exports = router;