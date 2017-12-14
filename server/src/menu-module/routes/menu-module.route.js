var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var MenuModuleController = require('../controllers/menu-module.controller');
var RoleValidation = require('../../../routes/role-validation');

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, guard.check('menu-module:listar'), MenuModuleController.getMenuModule);
router.get('/id/:id', RoleValidation.validateRole, guard.check('menu-module:visualizar'), MenuModuleController.getMenuModule);
router.get('/', RoleValidation.validateRole, guard.check('menu-module:listar'), MenuModuleController.getAllMenuModule);
router.get('/name/:name', MenuModuleController.getByName);
router.get('/modules', MenuModuleController.getModules);
router.get('/enum/:field', MenuModuleController.getEnumValue);
router.post('/', RoleValidation.validateRole, guard.check('menu-module:cadastrar'), MenuModuleController.createMenuModule);
router.put('/', RoleValidation.validateRole, guard.check('menu-module:editar'), MenuModuleController.updateMenuModule);
router.delete('/:id', RoleValidation.validateRole, guard.check('menu-module:remover'), MenuModuleController.removeMenuModule);

module.exports = router;