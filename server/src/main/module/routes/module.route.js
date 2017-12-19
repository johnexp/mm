var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var ModuleController = require('../controllers/module.controller');
var RoleValidation = require('../../../../routes/role-validation');

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, guard.check('module:listar'), ModuleController.getModules);
router.get('/id/:id', RoleValidation.validateRole, guard.check('module:visualizar'), ModuleController.getModule);
router.get('/:actives?', RoleValidation.validateRole, guard.check('module:listar'), ModuleController.getAllModules);
router.post('/', RoleValidation.validateRole, guard.check('module:cadastrar'), ModuleController.createModule);
router.put('/', RoleValidation.validateRole, guard.check('module:editar'), ModuleController.updateModule);
router.delete('/:id', RoleValidation.validateRole, guard.check('module:ativar/inativar'), ModuleController.removeModule);

module.exports = router;