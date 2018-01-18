var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var MenuModuleController = require('../controllers/menu-module.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, MenuModuleController.getMenuModule);
router.get('/id/:id', RoleValidation.validateRole, MenuModuleController.getMenuModule);
router.get('/', RoleValidation.validateRole, MenuModuleController.getAllMenuModule);
router.get('/name/:name', MenuModuleController.getByName);
router.get('/modules', MenuModuleController.getModules);
router.get('/enum/:field', MenuModuleController.getEnumValue);
router.post('/', RoleValidation.validateRole, MenuModuleController.createMenuModule);
router.put('/', RoleValidation.validateRole, MenuModuleController.updateMenuModule);
router.delete('/:id', RoleValidation.validateRole, MenuModuleController.removeMenuModule);

module.exports = router;