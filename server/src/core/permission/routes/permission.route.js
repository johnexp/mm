var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var PermissionController = require('../controllers/permission.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, PermissionController.getPermissiones);
router.get('/id/:id', RoleValidation.validateRole, PermissionController.getPermission);
router.get('/:actives?', RoleValidation.validateRole, PermissionController.getAllPermissiones);
router.post('/', RoleValidation.validateRole, PermissionController.createPermission);
router.put('/', RoleValidation.validateRole, PermissionController.updatePermission);
router.delete('/:id', RoleValidation.validateRole, PermissionController.removePermission);

module.exports = router;