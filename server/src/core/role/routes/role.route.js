var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var RoleController = require('../controllers/role.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, RoleController.getRoles);
router.get('/id/:id', RoleValidation.validateRole, RoleController.getRole);
router.get('/:actives?', RoleValidation.validateRole, RoleController.getAllRoles);
router.post('/', RoleValidation.validateRole, RoleController.createRole);
router.put('/', RoleValidation.validateRole, RoleController.updateRole);
router.delete('/:id', RoleValidation.validateRole, RoleController.removeRole);


module.exports = router;