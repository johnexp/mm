var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var PermissionController = require('../controllers/permission.controller');
var RoleValidation = require('../../../routes/role-validation');

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, guard.check('permission:listar'), PermissionController.getPermissiones);
router.get('/id/:id', RoleValidation.validateRole, guard.check('permission:visualizar'), PermissionController.getPermission);
router.get('/:actives?', RoleValidation.validateRole, guard.check('permission:listar'), PermissionController.getAllPermissiones);
router.post('/', RoleValidation.validateRole, guard.check('permission:cadastrar'), PermissionController.createPermission);
router.put('/', RoleValidation.validateRole, guard.check('permission:editar'), PermissionController.updatePermission);
router.delete('/:id', RoleValidation.validateRole, guard.check('permission:ativar/inativar'), PermissionController.removePermission);

module.exports = router;