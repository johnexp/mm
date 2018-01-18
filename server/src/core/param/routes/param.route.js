var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var ParamController = require('../controllers/param.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRoleOptional('param:listar'), ParamController.getParams);
router.get('/id/:id', RoleValidation.validateRoleOptional('param:visualizar'), ParamController.getParam);
router.get('/:actives?', RoleValidation.validateRoleOptional('param:listar'), ParamController.getAllParams);
router.post('/', RoleValidation.validateRole, ParamController.createParam);
router.put('/', RoleValidation.validateRoleOptional('param:editar'), ParamController.updateParam);
router.delete('/:id', RoleValidation.validateRole, ParamController.removeParam);

module.exports = router;